// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : editor.js
// Description : Provides Monaco editor lifecycle, tabs, and navigation integration.
// -----------------------------------------------------------------------------
import { statusCenter, updateCursorStatus, setFileStatus, toast, logit } from "../lib/status.js";
import { detectLanguageByFilename, getLanguageFromExt } from "../lib/lang.js";
import { updatePreviewButtonVisibility, applyPreviewVisibility, renderPreview, getPreviewOn, setPreviewOn } from "../ui/preview.js";
import { navigateTo } from "../ui/nav.js";
import { copyTextToClipboard } from "../ui/permalink.js";
import { registerMakefileLanguage } from "./language/makefile.js";
import { registerVimLanguage } from "./language/vim.js";
import { registerEditorShellKeymaps } from "../lib/keymap.js";

let monacoLoadPromise = null;
let monacoLoaded = false;

/**
 * Ensures Monaco is loaded. Returns immediately if already loaded.
 * First call will trigger dynamic script loading.
 */
export function ensureMonacoLoaded() {
  if (monacoLoaded) return Promise.resolve();
  if (monacoLoadPromise) return monacoLoadPromise;

  monacoLoadPromise = new Promise((resolve, reject) => {
    // Load Monaco loader dynamically (first time only)
    if (!window.require) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.min.js';
      script.onload = () => {
        require.config({
          paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
        });
        require(['vs/editor/editor.main'], () => {
          monacoLoaded = true;
          logit.info("MONACO", "Loaded successfully");
          resolve();
        });
      };
      script.onerror = () => {
        logit.error("MONACO", "Failed to load");
        reject(new Error("Failed to load Monaco"));
      };
      document.head.appendChild(script);
    } else {
      // Monaco loader already available, configure and require editor
      // Avoid reconfiguring paths if already set to prevent duplicate module definitions
      if (!window.__monacoConfigured) {
        require.config({
          paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
        });
        window.__monacoConfigured = true;
      }
      require(['vs/editor/editor.main'], () => {
        monacoLoaded = true;
        logit.info("MONACO", "Loaded successfully");
        resolve();
      });
    }
  });

  return monacoLoadPromise;
}

/**
 * Preload Monaco in the background (doesn't block)
 */
export function preloadMonaco() {
  ensureMonacoLoaded().catch(err => logit.warn('MONACO', `Preload failed: ${err?.message || err}`));
}

let __blinkDecorations = [];
let editor;
let openTabs = [];
let activePath = null;
let fullTree = null;

let closedTabs = [];
const MAX_CLOSED_TABS = 10;

const LS_OPEN_TABS = "kbook.openTabs";
const LS_ACTIVE_PATH = "kbook.activePath";

const MAX_TABS = 7;

function notifyActiveTabChanged(path) {
  try {
    window.dispatchEvent(new CustomEvent("kbook:active-tab-changed", { detail: { path: path || "" } }));
  } catch { }
}

export function setFullTree(tree) { fullTree = tree; }
export function getFullTree() { return fullTree; }
export function getEditor() { return editor; }
export function getActivePath() { return activePath; }
export function getActiveTab() { return openTabs.find(t => t.path === activePath) || null; }
export function getOpenTabs() { return openTabs; }

export function switchToNextTab() {
  if (openTabs.length <= 1) return;
  const currentIndex = openTabs.findIndex(t => t.path === activePath);
  const nextIndex = (currentIndex + 1) % openTabs.length;
  setActiveTab(openTabs[nextIndex].path);
}

export function closeActiveTab() {
  if (activePath) closeTab(activePath);
}

export function switchToTabByIndex(index) {
  if (index < 0 || index >= openTabs.length) return;
  setActiveTab(openTabs[index].path);
}

export function reopenLastClosedTab() {
  if (closedTabs.length === 0) {
    toast("No recently closed tabs");
    return;
  }

  const lastClosed = closedTabs.pop();

  if (openTabs.find(t => t.path === lastClosed.path)) {
    toast(`${lastClosed.name} is already open`);
    setActiveTab(lastClosed.path);
    return;
  }

  navigateTo(lastClosed.path, null, null, { record: true });
  toast(`Reopened: ${lastClosed.name}`);
}

function isMobile() {
  return window.innerWidth <= 768;
}

export function blinkLine(lineNumber) {
  if (!editor || !lineNumber || lineNumber < 1) return;
  try {
    __blinkDecorations = editor.deltaDecorations(
      __blinkDecorations,
      [{
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: 'line-highlight',
          glyphMarginClassName: 'line-glyph',
          hoverMessage: { value: `Line ${lineNumber}` }
        }
      }]
    );
  } catch { }
}

function scrollActiveTabIntoView(tabEl) {
  const bar = document.getElementById("tabs");
  if (!bar || !tabEl) return;
  const br = bar.getBoundingClientRect();
  const er = tabEl.getBoundingClientRect();
  if (er.left < br.left) bar.scrollLeft += er.left - br.left - 16;
  else if (er.right > br.right) bar.scrollLeft += er.right - br.right + 16;
}

function enforceTabLimit() {
  while (openTabs.length >= MAX_TABS) {
    const victim = openTabs.find(t => t.path !== activePath) || openTabs[0];
    if (!victim) break;
    closeTab(victim.path);
  }
}

export function openTab(file, location) {
  const existing = openTabs.find(t => t.path === file.path);
  if (existing) { setActiveTab(existing.path, location || null); return; }

  enforceTabLimit();
  const tabEl = document.createElement("div");
  tabEl.className = "tab";
  tabEl.textContent = file.name;

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeTab(file.path); });

  tabEl.appendChild(closeBtn);
  tabEl.addEventListener("click", () => setActiveTab(file.path));
  document.getElementById("tabs").appendChild(tabEl);

  openTabs.push({ path: file.path, name: file.name, content: file.content, tabEl });
  setActiveTab(file.path, location || null);
  scrollActiveTabIntoView(tabEl);
  try { localStorage.setItem(LS_OPEN_TABS, JSON.stringify(openTabs.map(t => t.path))); } catch (e) { }
}

export function closeTab(path) {
  const index = openTabs.findIndex(t => t.path === path);
  if (index !== -1) {
    // Store closed tab info for reopening
    const closedTab = { path: openTabs[index].path, name: openTabs[index].name };
    closedTabs.push(closedTab);
    // Keep only last MAX_CLOSED_TABS
    if (closedTabs.length > MAX_CLOSED_TABS) {
      closedTabs.shift();
    }

    openTabs[index].tabEl.remove();
    openTabs.splice(index, 1);
    if (activePath === path && openTabs.length > 0) setActiveTab(openTabs[openTabs.length - 1].path);
    else if (openTabs.length === 0) {
      editor.setValue(""); activePath = null; setFileStatus(null, null);
      setPreviewOn(false); applyPreviewVisibility();
      renderBreadcrumbs("");
      notifyActiveTabChanged("");
    }
    try { localStorage.setItem(LS_OPEN_TABS, JSON.stringify(openTabs.map(t => t.path))); } catch (e) { }
  }
}

export function setActiveTab(path, location = null) {
  activePath = path;

  const activeFile = openTabs.find(t => t.path === path);
  if (!activeFile) return;

  for (const tab of openTabs) {
    const shouldBeActive = tab.path === path;
    const isActive = tab.tabEl.classList.contains("active");
    if (shouldBeActive !== isActive) {
      tab.tabEl.classList.toggle("active", shouldBeActive);
    }
  }

  if (!monacoLoaded || !editor) {
    logit.warn('EDITOR', `Monaco not ready, cannot set active tab for ${path}`);
    return;
  }

  const byName = detectLanguageByFilename(activeFile.name);
  const ext = activeFile.name.includes(".") ? activeFile.name.split(".").pop().toLowerCase() : activeFile.name.toLowerCase();
  let lang = byName || getLanguageFromExt(ext);

  try { monaco.editor.setModelLanguage(editor.getModel(), lang); }
  catch { lang = "plaintext"; monaco.editor.setModelLanguage(editor.getModel(), lang); }

  editor.setValue(activeFile.content);
  setFileStatus(activeFile.path, lang);
  updateCursorStatus(editor);

  const isMd = /\.md(?:|own)?$|\.markdown$/i.test(activeFile.name);
  if (isMd) {
    setPreviewOn(true);
    applyPreviewVisibility();
    updatePreviewButtonVisibility();
    renderPreview().catch(() => { });
  } else {
    updatePreviewButtonVisibility();
    if (getPreviewOn()) renderPreview().catch(() => { });
  }

  renderBreadcrumbs(path);
  scrollActiveTabIntoView(activeFile.tabEl);

  try { localStorage.setItem(LS_ACTIVE_PATH, path); } catch (e) { }

  notifyActiveTabChanged(path);

  if (location) setTimeout(() => goToLocation(path, location.line, location.pattern), 0);
}


function persistOpenTabs() {
  try {
    const paths = openTabs.map(t => t.path);
    localStorage.setItem(LS_OPEN_TABS, JSON.stringify(paths));
    localStorage.setItem(LS_ACTIVE_PATH, activePath || "");
  } catch (e) { /* ignore */ }
}

export async function restoreOpenTabs(navigateTo) {
  try {
    const raw = localStorage.getItem(LS_OPEN_TABS);
    if (!raw) return;
    const paths = JSON.parse(raw) || [];
    for (const p of paths) {
      try {
        if (typeof navigateTo === "function") {
          await navigateTo(p, null, null, { record: false });
        }
      } catch (e) { /* ignore individual failures */ }
    }
    const active = localStorage.getItem(LS_ACTIVE_PATH);
    if (active) setActiveTab(active);
  } catch (e) { /* ignore */ }
}

export function createMonacoEditor() {
  if (editor) {
    logit.debug("MONACO", "Editor already created, skipping");
    return Promise.resolve();
  }

  return ensureMonacoLoaded().then(() => {
    return new Promise((resolve) => {
      logit.info("MONACO", "Creating editor instance...");
      const editorCreateStart = performance.now();

      if (!require.defined || !require.defined('vs/editor/editor.main')) {
        require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
      }

      require(["vs/editor/editor.main"], function () {
        try {
          registerMakefileLanguage(monaco);
          logit.info("MONACO", "Makefile language registered");
        }
        catch (e) {
          logit.warn('MONACO', `Makefile language registration failed: ${e?.message || e}`);
        }
        try {
          registerVimLanguage(monaco);
          logit.info("MONACO", "Vim language registered");
        }
        catch (e) {
          logit.warn('MONACO', `Vim language registration failed: ${e?.message || e}`);
        }

        const opts = {
          value: "",
          language: "plaintext",
          theme: "vs-dark",
          automaticLayout: true,
          readOnly: true,
          wordWrap: "on",
          domReadOnly: true,
          minimap: { enabled: false }
        };

        editor = monaco.editor.create(document.getElementById("editor"), opts);
        const editorCreateTime = (performance.now() - editorCreateStart).toFixed(2);
        logit.info('MONACO', `Editor created (${editorCreateTime}ms)`);

        try {
          const edContainer = document.getElementById("editor");
          if (edContainer) {
            const persistentRo = new ResizeObserver(() => {
              try {
                const editorEl = document.getElementById("editor");
                const rightEl = document.getElementById("right");
                const edRect = editorEl?.getBoundingClientRect?.() || null;
                const rightRect = rightEl?.getBoundingClientRect?.() || null;
                editor.layout();
              } catch (e) { }
            });
            persistentRo.observe(edContainer);
          }
        } catch (e) { /* ignore if ResizeObserver unavailable */ }

        addContextMenuActions();

        editor.onDidChangeCursorPosition(() => {
          updateCursorStatus(editor);
        });
        editor.onDidLayoutChange(() => updateCursorStatus(editor));

        wirePermalinkButton();
        wireCtrlClickDelegates();

        updateCursorStatus(editor);
        statusCenter("Editor ready");
        logit.info("MONACO", "Editor fully initialized and ready to use");
        resolve(editor);
      });
    });
  });
}

function goToLocation(path, line = null, pattern = null) {
  if (typeof line === "number" && line > 0) {
    editor.revealLineInCenter(line);
    editor.setPosition({ lineNumber: line, column: 1 });
    editor.focus();
    blinkLine(line);
    updateCursorStatus(editor);
    return;
  }
  if (pattern && typeof pattern === "string") {
    const m = pattern.match(/^\/(.*)\/(?:[a-z]*)$/);
    const body = m ? m[1] : pattern;
    try {
      const re = new RegExp(body, "m");
      const content = editor.getModel().getValue();
      const match = re.exec(content);
      if (match) {
        const pre = content.slice(0, match.index);
        const lineNum = pre.split(/\r?\n/).length;
        editor.revealLineInCenter(lineNum);
        editor.setPosition({ lineNumber: lineNum, column: 1 });
        editor.focus();
        blinkLine(lineNum);
        updateCursorStatus(editor);
        return;
      }
    } catch { }
  }
}

export function getWordUnderCursor() {
  const model = editor.getModel();
  const pos = editor.getPosition();
  if (!model || !pos) return null;
  const w = model.getWordAtPosition(pos);
  return w ? w.word : null;
}

function renderBreadcrumbs(path) {
  const el = document.getElementById("breadcrumbs");
  if (!el) return;
  el.innerHTML = "";
  if (!path) return;

  const parts = String(path).split("/").filter(Boolean);
  let accum = "";
  parts.forEach((seg, idx) => {
    accum += (idx ? "/" : "") + seg;
    const isLeaf = idx === parts.length - 1;
    const crumb = document.createElement("span");
    crumb.className = "crumb" + (isLeaf ? " leaf" : " clickable");
    crumb.textContent = seg;

    if (!isLeaf) {
      crumb.addEventListener("click", () => {
        expandFolderPath(accum);
      });
    } else {
      crumb.addEventListener("click", () => {
        document.getElementById("editor")?.focus();
      });
    }

    el.appendChild(crumb);
    if (!isLeaf) {
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "/";
      el.appendChild(sep);
    }
  });
}

function expandFolderPath(dirPath) {
  const li = document.querySelector(`#file-tree li.folder[data-path="${CSS.escape(dirPath)}"]`)
    || document.querySelector(`#file-tree li.folder[data-path="./${CSS.escape(dirPath)}"]`);
  if (!li) return;
  const sub = li.querySelector(":scope > ul");
  if (sub) {
    li.classList.add("expanded");
    sub.style.display = "block";
    li.scrollIntoView({ block: "nearest" });
  }
}

export function addContextMenuActions() {
  registerEditorShellKeymaps({ editor, monaco });
}



function buildViewportUrl(path, line = null) {
  const u = new URL("viewport.html", location.href);
  u.searchParams.set("path", path);
  if (line && Number(line) > 0) u.searchParams.set("line", String(Number(line)));
  return u.toString();
}

function wirePermalinkButton() {
  const btn = document.getElementById("editor-permalink");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    if (!activePath) return;
    const pos = editor?.getPosition?.();
    const line = pos?.lineNumber || null;
    const url = buildViewportUrl(activePath, line);
    const copied = await copyTextToClipboard(url);
    if (copied) {
      toast("Permalink copied.", "info");
      logit.info('EDITOR', `Permalink copied: ${url}`);
    } else {
      toast("Failed to copy permalink", "error");
      logit.info('EDITOR', `Permalink copy failed: ${url}`);
    }
  });
}

function openInViewport(path, line = null) {
  const href = buildViewportUrl(path, line);
  window.open(href, "_blank", "noopener");
}

function wireCtrlClickDelegates() {
  const tree = document.getElementById("file-tree");
  if (tree) {
    tree.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-path]");
      if (!li) return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;
      const path = li.getAttribute("data-path");
      e.preventDefault(); e.stopPropagation();
      openInViewport(path);
    }, true);
  }

  const hook = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-path]");
      if (!li) return;
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;
      const path = li.getAttribute("data-path");
      const lineAttr = li.getAttribute("data-line");
      const line = lineAttr ? Number(lineAttr) : null;
      e.preventDefault(); e.stopPropagation();
      openInViewport(path, line);
    }, true);
  };
  hook("chapter-toc-list");
}
