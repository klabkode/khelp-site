// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : viewport.js
// Description : Provides viewport page bootstrap and interaction wiring.
// -----------------------------------------------------------------------------

import { createMonacoEditor, blinkLine, openTab, setActiveTab, getActiveTab, switchToNextTab, closeActiveTab, reopenLastClosedTab, switchToTabByIndex, setFullTree } from "../editor/editor.js";
import { loadFile, loadFullTree, invalidateTocCache } from "../fs/fs.js";
import { detectLanguageByFilename, getLanguageFromExt } from "../lib/lang.js";
import { statusCenter, logit, toast, updateDirStats } from "../lib/status.js";
import { applyPreviewVisibility, renderPreview, setPreviewOn, updatePreviewButtonVisibility, getPreviewOn, togglePreview } from "./preview.js";
import { goBack, goForward, updateNavButtons } from "./nav.js";
import { registerWindowKeymaps, setEditorShellKeymapHandlers } from "../lib/keymap.js";
import { clearCachedTree, clearCachedSymbols } from "../lib/cache.js";
import { focusOutlineFilterInput, toggleOutlinePanel } from "./outline.js";
import { createTocController, extractHeadings, isMarkdownPath } from "./toc.js";
import { copyPathWithToast } from "./permalink.js";
import {
  clearClientStateAndReload,
  downloadTextFile,
  openPathInViewport,
  toggleEditorMinimap,
  toggleEditorWordWrap,
  triggerFindInEditor
} from "./editor/tools.js";

let viewportEditor = null;
let viewportPath = null;
let tocController = null;
let scrollTowardsBottom = true;

function getQueryParam(key) {
  return new URLSearchParams(location.search).get(key);
}

function isMobile() {
  return window.innerWidth <= 768;
}

function saveActiveTab() {
  const model = viewportEditor?.getModel();
  if (!model || !viewportPath) return;
  downloadTextFile(model.getValue() ?? "", viewportPath.split("/").pop() || "download.txt");
}

function toggleMinimap() {
  toggleEditorMinimap(viewportEditor, monaco);
}

function toggleWordWrap() {
  toggleEditorWordWrap(viewportEditor, monaco);
}

function openInNewTab() {
  openPathInViewport(viewportPath, location.href);
}

async function clearCacheAndReload() {
  await clearClientStateAndReload({ clearCachedTree, clearCachedSymbols, invalidateTocCache, toast, logit });
}

function triggerEditorSearch() {
  triggerFindInEditor(viewportEditor);
}

function scrollToTop() {
  if (getPreviewOn()) {
    document.getElementById("preview-frame")?.contentWindow?.postMessage({ type: "scrollTop" }, "*");
  } else {
    viewportEditor?.setScrollPosition({ scrollTop: 0 });
  }
}

function scrollToBottom() {
  if (getPreviewOn()) {
    document.getElementById("preview-frame")?.contentWindow?.postMessage({ type: "scrollBottom" }, "*");
  } else {
    const model = viewportEditor?.getModel();
    if (model) viewportEditor?.revealLine(model.getLineCount());
  }
}

function updateScrollToggleTitle() {
  const btn = document.getElementById("scroll-toggle");
  if (!btn) return;
  btn.title = scrollTowardsBottom ? "Scroll to bottom" : "Scroll to top";
}

function toggleScrollDirection() {
  if (scrollTowardsBottom) {
    scrollToBottom();
  } else {
    scrollToTop();
  }
  scrollTowardsBottom = !scrollTowardsBottom;
  updateScrollToggleTitle();
}

function syncPreviewHeadingIds() {
  tocController?.syncPreviewHeadingIds();
}

async function refreshOutlineForActiveTab() {
  const tab = getActiveTab();
  const isMarkdown = isMarkdownPath(tab?.path || tab?.name || viewportPath || "");
  const headings = tab && isMarkdown ? await extractHeadings(tab.content || "") : [];
  tocController?.setHeadings(headings, { silentEmpty: !isMarkdown });
  syncPreviewHeadingIds();
}

function initToc() {
  tocController = createTocController({
    listElement: document.getElementById("chapter-toc-list"),
    filterInputElement: document.getElementById("chapter-toc-filter"),
    filterButtonElement: document.getElementById("chapter-toc-go-btn"),
    getPreviewOn,
    getPreviewFrame: () => document.getElementById("preview-frame"),
    onEditorHeadingNavigate: (heading) => {
      if (!viewportEditor || !heading?.line) return;
      viewportEditor.revealLineInCenter(heading.line);
      viewportEditor.setPosition({ lineNumber: heading.line, column: 1 });
      viewportEditor.focus();
      blinkLine(heading.line);
    }
  });
}

function focusOutlineFilter() {
  focusOutlineFilterInput({ ensureVisible: toggleViewportOutlinePanel });
}

function toggleViewportOutlinePanel() {
  toggleOutlinePanel({ persist: false, dispatchResize: true });
}

const VIEWPORT_KEYMAP_HANDLERS = Object.freeze({
  saveActiveTab,
  focusExplorerSearch: triggerEditorSearch,
  focusOutlineFilter,
  reopenLastClosedTab,
  switchToNextTab,
  closeActiveTab,
  toggleOutlinePanel: toggleViewportOutlinePanel,
  togglePreview,
  toggleMinimap,
  toggleWordWrap,
  openInNewTab,
  goBack,
  goForward,
  switchToTabByIndex,
  clearCacheAndReload,
  triggerEditorSearch,

  // Backward-compatible aliases.
  openGrepOutline: triggerEditorSearch,
  openGrepFile: focusOutlineFilter,
  activateOutlineTagsTab: focusOutlineFilter
});

window.addEventListener("load", async () => {
  viewportPath = getQueryParam("path");
  const line = Number(getQueryParam("line") || 0);

  if (!viewportPath) {
    statusCenter("No file specified in URL");
    return;
  }

  setEditorShellKeymapHandlers(VIEWPORT_KEYMAP_HANDLERS);

  const ed = await createMonacoEditor();
  viewportEditor = ed;
  initToc();

  if (isMobile()) {
    ed.updateOptions({ minimap: { enabled: false }, wordWrap: "on" });
    logit.info("", "Mobile viewport: minimap OFF, word wrap ON, soft keyboard disabled");
    statusCenter("Mobile mode: minimap OFF, wrap ON, read-only");
  }

  const oldToggle = document.getElementById("toggle-outline-panel");
  if (oldToggle) {
    const clone = oldToggle.cloneNode(true);
    clone.classList.remove("codicon-layout-sidebar-right-off");
    clone.classList.add("codicon-layout-sidebar-right");
    clone.setAttribute("aria-pressed", "true");
    oldToggle.replaceWith(clone);
  }

  logit.info("TREE", "Loading tree for viewport...");
  const treeStart = performance.now();
  try {
    const payload = await loadFullTree();
    const items = Array.isArray(payload?.items) ? payload.items : [];
    setFullTree(items);
    updateDirStats(payload?.meta || null, items);
    const treeMs = (performance.now() - treeStart).toFixed(2);
    logit.info("TREE", `Loaded (${treeMs}ms)`);
  } catch (err) {
    setFullTree([]);
    updateDirStats(null, []);
    logit.warn("TREE", `Load error: ${err?.message || err}`);
  }

  try {
    const file = await loadFile(viewportPath);
    let lang = detectLanguageByFilename(file.name);
    if (!lang) {
      const ext = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "";
      lang = getLanguageFromExt(ext);
    }

    openTab(file);
    setActiveTab(file.path);
    monaco.editor.setModelLanguage(ed.getModel(), lang);

    if (line > 0) {
      ed.revealLineInCenter(line);
      ed.setPosition({ lineNumber: line, column: 1 });
      blinkLine(line);
    }

    statusCenter(`Opened ${file.name}`);

  } catch (e) {
    logit.error('VIEWPT', `Viewport load failed: ${e?.message || e}`);
    statusCenter("Error loading file: " + e.message);
  }

  const bindToolbar = (toolbarEl) => toolbarEl?.addEventListener("click", async (e) => {
    const target = e.target.closest("span[id]");
    if (!target) return;

    const handlers = {
      "editor-minimap": toggleMinimap,
      "editor-wrap": toggleWordWrap,
      "editor-preview": () => {
        const on = !getPreviewOn();
        setPreviewOn(on);
        applyPreviewVisibility();
        if (on) {
          renderPreview().then(() => syncPreviewHeadingIds()).catch(() => { });
        }
      },
      "editor-save": saveActiveTab,
      "editor-search": triggerEditorSearch,
      "scroll-toggle": toggleScrollDirection,
      "editor-copy-path": async () => {
        if (!viewportPath) return;
        await copyPathWithToast(viewportPath, toast);
      },
      "clear-cache": clearCacheAndReload,
    };

    const handler = handlers[target.id];
    if (handler) {
      e.preventDefault();
      handler(e);
    }
  });

  bindToolbar(document.getElementById("editor-toolbar"));
  updateScrollToggleTitle();

  window.addEventListener("kbook:active-tab-changed", () => {
    refreshOutlineForActiveTab().catch(() => {
      // Ignore heading extraction failures during tab-change churn.
    });
  });
  window.addEventListener("message", (event) => {
    try {
      if (event?.data?.type === "kbook-md-ready") {
        syncPreviewHeadingIds();
      }
    } catch {
      // Ignore malformed messages from other frames.
    }
  });

  document.getElementById("toggle-outline-panel")?.addEventListener("click", () => {
    toggleViewportOutlinePanel();
  });

  registerWindowKeymaps({ handlers: VIEWPORT_KEYMAP_HANDLERS });

  await refreshOutlineForActiveTab();

  updateNavButtons();
  applyPreviewVisibility();
  updatePreviewButtonVisibility();
});
