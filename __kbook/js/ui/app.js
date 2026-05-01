// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : app.js
// Description : KBook SPA coordinator — loads toc.json, drives tree + Monaco + preview.
//               MD loading and display delegates fully to editor.js + preview.js
//               (same pipeline as KBook). Book-specific features: chapter tree and
//               heading TOC panel in the outline side panel.
// -----------------------------------------------------------------------------

import { registerWindowKeymaps, setEditorShellKeymapHandlers } from "../lib/keymap.js";
import { logit, toast, statusCenter, updateDirStats as statusUpdateDirStats } from "../lib/status.js";
import {
  createMonacoEditor, preloadMonaco, getEditor,
  getActiveTab, getActivePath,
  switchToNextTab, closeActiveTab, reopenLastClosedTab, switchToTabByIndex,
  restoreOpenTabs, blinkLine
} from "../editor/editor.js";
import {
  renderPreview, applyPreviewVisibility, updatePreviewButtonVisibility,
  setPreviewOn, getPreviewOn, togglePreview
} from "./preview.js";
import { shouldUseVirtualScroll, createTreeScroller } from "./scroll.js";
import { navigateTo, goBack, goForward, updateNavButtons } from "./nav.js";
import { toggleOutlinePanel } from "./layout.js";
import { focusOutlineFilterInput } from "./outline.js";
import { createTocController, extractHeadings, isMarkdownPath } from "./toc.js";
import { copyPathWithToast } from "./permalink.js";
import { loadToc, invalidateTocCache } from "../fs/fs.js";
import {
  clearClientStateAndReload,
  downloadTextFile,
  openPathInViewport,
  toggleEditorMinimap,
  toggleEditorWordWrap,
  triggerFindInEditor
} from "./editor/tools.js";

const IS_VIEWPORT = Boolean(window.__KBOOK_VIEWPORT__);

const STORAGE = Object.freeze({
  TREE_EXPANDED: "kbook.tree.expanded"
});

const state = {
  toc: null,
  chapterMap: new Map(),
  treeNodes: [],
  expandedFolders: new Set(),
  selectedTreeItem: null,
  unregisterKeymaps: null,
  activeHeadings: []
};

const NATURAL_COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

let treeScroller = null;
let tocController = null;
let scrollTowardsBottom = true;

function byId(id) {
  return document.getElementById(id);
}

function isMobileView() {
  return window.innerWidth <= 768;
}

function cssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === "function") {
    return window.CSS.escape(value);
  }
  return String(value).replace(/[^a-zA-Z0-9_\-]/g, "\\$&");
}

function normalizePath(path) {
  const input = String(path || "").replace(/\\/g, "/");
  const parts = [];
  for (const seg of input.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") { parts.pop(); } else { parts.push(seg); }
  }
  return parts.join("/");
}

function humanizeSegment(segment) {
  return String(segment || "")
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[\s._-]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() || segment;
}

function readJsonArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function persistExpandedFolders() {
  try {
    localStorage.setItem(STORAGE.TREE_EXPANDED, JSON.stringify(Array.from(state.expandedFolders)));
  } catch { /* ignore */ }
}

function bindActionButton(el, action) {
  if (!el || el.dataset.bound === "1") return;
  el.dataset.bound = "1";
  el.addEventListener("click", (event) => { event.preventDefault(); action(); });
  el.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    action();
  });
}

function loadPreferences() {
  state.expandedFolders = new Set(readJsonArray(STORAGE.TREE_EXPANDED));
}

function flattenTocChapters(entries) {
  const out = [];
  const walk = (chapter) => {
    out.push(chapter);
    for (const child of chapter.children || []) walk(child);
  };
  for (const entry of entries || []) {
    if (entry?.type === "chapter") walk(entry);
  }
  return out;
}

function buildChapterMap(entries) {
  state.chapterMap.clear();
  for (const chapter of flattenTocChapters(entries)) {
    const path = normalizePath(chapter.path || "");
    if (!path) continue;
    if (!state.chapterMap.has(path)) state.chapterMap.set(path, chapter);
  }

  const rootIndexPath = normalizePath(state.toc?.root_index?.path || "");
  if (!rootIndexPath || state.chapterMap.has(rootIndexPath)) return;

  state.chapterMap.set(rootIndexPath, {
    type: "chapter",
    title: String(state.toc?.root_index?.title || "INDEX"),
    path: rootIndexPath,
    fragment: "",
    draft: false,
    depth: 0,
    line: 0,
    children: []
  });
}

// Build a map from directory path → heading title using the ordered entries.
// Each chapter's top-level directory is associated with the most recent heading
// seen before it, giving us the labeled name (e.g. "1. CHAPTER1") for each dir.
function buildDirTitleMap(entries) {
  const map = new Map();
  let currentHeading = "";
  for (const entry of entries || []) {
    if (entry?.type === "heading") {
      currentHeading = String(entry.title || "");
    } else if (entry?.type === "chapter" && currentHeading) {
      const path = normalizePath(entry.path || "");
      const topDir = path.split("/")[0];
      if (topDir && !map.has(topDir)) map.set(topDir, currentHeading);
    }
  }
  return map;
}

function sortTreeNodes(nodes) {
  for (const node of nodes) {
    if (node.type === "dir") sortTreeNodes(node.children);
  }
  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return NATURAL_COLLATOR.compare(a.sortKey, b.sortKey);
  });
}

function buildTreeNodesFromChapters() {
  const roots = [];
  const seenPaths = new Set();
  const rootIndexPath = normalizePath(state.toc?.root_index?.path || "");
  const dirTitleMap = buildDirTitleMap(state.toc?.entries);
  const chapters = Array.from(state.chapterMap.entries()).map(([path, chapter]) => ({ path, chapter }));
  for (const { path, chapter } of chapters) {
    if (seenPaths.has(path)) continue;
    seenPaths.add(path);
    const parts = path.split("/").filter(Boolean);
    if (!parts.length) continue;
    let list = roots;
    let parentPath = "";
    for (let i = 0; i < parts.length - 1; i += 1) {
      const segment = parts[i];
      parentPath = parentPath ? `${parentPath}/${segment}` : segment;
      let dirNode = list.find((item) => item.type === "dir" && item.path === parentPath);
      if (!dirNode) {
        const dirName = dirTitleMap.get(parentPath) || humanizeSegment(segment);
        dirNode = { type: "dir", path: parentPath, name: dirName, sortKey: dirName.toLowerCase(), children: [] };
        list.push(dirNode);
      }
      list = dirNode.children;
    }
    const fileName = parts[parts.length - 1];
    const title = chapter?.title ? String(chapter.title) : humanizeSegment(fileName);
    list.push({ type: "file", path, name: title, sortKey: title.toLowerCase(), chapter });
  }
  sortTreeNodes(roots);

  if (rootIndexPath) {
    const rootIndexNode = roots.find((node) => node?.type === "file" && node.path === rootIndexPath);
    if (rootIndexNode) {
      roots.splice(roots.indexOf(rootIndexNode), 1);
      roots.push(rootIndexNode);
    }
  }

  return roots;
}

function collectFolderPaths(nodes, out = new Set()) {
  for (const node of nodes || []) {
    if (!node) continue;
    if (node.type === "dir") { out.add(node.path); collectFolderPaths(node.children, out); }
  }
  return out;
}

function countTreeStats(nodes) {
  let dirs = 0, files = 0;
  const walk = (items) => {
    for (const item of items || []) {
      if (item.type === "dir") { dirs += 1; walk(item.children || []); }
      else { files += 1; }
    }
  };
  walk(nodes);
  return { dirs, files };
}

function flattenTree(nodes, depth = 0, out = []) {
  for (const node of nodes || []) {
    out.push({
      path: node.path,
      name: node.name,
      isDir: node.type === "dir",
      depth
    });
    if (node.children && node.children.length) {
      flattenTree(node.children, depth + 1, out);
    }
  }
  return out;
}

function searchTree(query, nodes) {
  const q = String(query || "").toLowerCase();
  const results = [];
  for (const node of nodes || []) {
    const ownMatch = node.name.toLowerCase().includes(q);
    if (node.type === "dir") {
      const childMatches = searchTree(q, node.children || []);
      if (ownMatch || childMatches.length > 0) {
        results.push({ ...node, children: ownMatch ? node.children : childMatches });
      }
    } else if (ownMatch) { results.push(node); }
  }
  return results;
}

function showTreeSkeleton() {
  byId("tree-skeleton")?.classList.remove("hidden");
  byId("file-tree")?.classList.add("hidden-tree");
}

function hideTreeSkeleton() {
  byId("tree-skeleton")?.classList.add("hidden");
  byId("file-tree")?.classList.remove("hidden-tree");
}

function getTreeExpansionState() {
  const allPaths = collectFolderPaths(state.treeNodes);
  const total = allPaths.size;
  if (total === 0) return { total: 0, expanded: 0, fullyExpanded: false, fullyCollapsed: true };
  let expanded = 0;
  for (const p of allPaths) { if (state.expandedFolders.has(p)) expanded += 1; }
  return { total, expanded, fullyExpanded: expanded === total, fullyCollapsed: expanded === 0 };
}

function syncTreeToggleButtons() {
  const expandBtn = byId("tree-expand-all");
  const collapseBtn = byId("tree-collapse-all");
  if (!expandBtn || !collapseBtn) return;
  const info = getTreeExpansionState();
  const showExpand = info.fullyCollapsed;
  expandBtn.classList.toggle("is-hidden", !showExpand);
  expandBtn.setAttribute("aria-hidden", String(!showExpand));
  expandBtn.tabIndex = showExpand ? 0 : -1;
  collapseBtn.classList.toggle("is-hidden", showExpand);
  collapseBtn.setAttribute("aria-hidden", String(showExpand));
  collapseBtn.tabIndex = showExpand ? -1 : 0;
}

function markActiveContext() {
  document.querySelectorAll("#file-tree li.folder.active-context").forEach((node) => {
    node.classList.remove("active-context");
  });
  if (!state.selectedTreeItem) return;
  let node = state.selectedTreeItem;
  while (node && node !== byId("file-tree")) {
    if (node.classList?.contains("folder") && node.classList.contains("expanded")) {
      node.classList.add("active-context");
    }
    node = node.parentElement?.closest?.("li.folder") || null;
  }
}

function updateTreeShadingFallback() {
  document.querySelectorAll("#file-tree li.folder.shade-block").forEach((node) => {
    node.classList.remove("shade-block");
  });
  const activeFolders = Array.from(document.querySelectorAll("#file-tree li.folder.expanded.active-context"));
  if (!activeFolders.length) return;
  let deepest = null;
  for (const folder of activeFolders) {
    const hasActiveChild = folder.querySelector(":scope > ul > li.folder.expanded.active-context");
    if (!hasActiveChild) { deepest = folder; break; }
  }
  (deepest || activeFolders[activeFolders.length - 1])?.classList.add("shade-block");
}

function selectTreeItem(li) {
  if (state.selectedTreeItem) state.selectedTreeItem.classList.remove("selected");
  state.selectedTreeItem = li;
  state.selectedTreeItem.classList.add("selected");
  markActiveContext();
  updateTreeShadingFallback();
}

function collapseFolder(li, persist = true) {
  if (!li?.classList?.contains("folder")) return;
  li.classList.remove("expanded");
  const sub = li.querySelector(":scope > ul");
  if (sub) sub.style.display = "none";
  if (persist) {
    const path = li.dataset.path || "";
    if (path) state.expandedFolders.delete(path);
    persistExpandedFolders();
  }
}

function expandFolder(li, persist = true) {
  if (!li?.classList?.contains("folder")) return;
  const sub = li.querySelector(":scope > ul");
  if (!sub) return;
  li.classList.add("expanded");
  sub.style.display = "block";
  if (persist) {
    const path = li.dataset.path || "";
    if (path) state.expandedFolders.add(path);
    persistExpandedFolders();
  }
}

function expandAncestorsForFileLi(fileLi, persist = true) {
  let folder = fileLi.parentElement?.closest?.("li.folder") || null;
  while (folder) {
    expandFolder(folder, persist);
    folder = folder.parentElement?.closest?.("li.folder") || null;
  }
}

function markActiveTreePath(path) {
  if (!path) return;
  const escaped = cssEscape(path);
  const fileLi = document.querySelector(`#file-tree li.file[data-path="${escaped}"]`);
  if (!fileLi) return;
  expandAncestorsForFileLi(fileLi, true);
  selectTreeItem(fileLi);
  syncTreeToggleButtons();
}

function appendTreeNode(node, parent, options) {
  const persistExpansion = options.persistExpansion !== false;
  const autoExpandParents = options.autoExpandParents === true;

  if (node.type === "dir") {
    const li = document.createElement("li");
    li.classList.add("folder");
    li.dataset.path = node.path;
    const arrow = document.createElement("span");
    arrow.classList.add("arrow");
    const name = document.createElement("span");
    name.classList.add("name");
    name.textContent = node.name;
    li.appendChild(arrow);
    li.appendChild(name);
    const sub = document.createElement("ul");
    const expanded = autoExpandParents || state.expandedFolders.has(node.path);
    if (expanded) {
      li.classList.add("expanded");
      sub.style.display = "block";
      if (persistExpansion) state.expandedFolders.add(node.path);
    } else {
      sub.style.display = "none";
    }
    li.addEventListener("click", (event) => {
      event.stopPropagation();
      if (li.classList.contains("expanded")) collapseFolder(li, persistExpansion);
      else expandFolder(li, persistExpansion);
      markActiveContext();
      updateTreeShadingFallback();
      syncTreeToggleButtons();
    });
    for (const child of node.children || []) appendTreeNode(child, sub, options);
    li.appendChild(sub);
    parent.appendChild(li);
    return;
  }

  const li = document.createElement("li");
  li.classList.add("file");
  li.dataset.path = node.path;
  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = node.name;
  li.appendChild(name);
  li.addEventListener("click", (event) => {
    event.stopPropagation();
    selectTreeItem(li);
    if (isMobileView()) {
      const url = new URL("viewport.html", window.location.href);
      url.searchParams.set("path", node.path);
      window.open(url.toString(), "_blank", "noopener");
      return;
    }
    openChapter(node.path, { record: true }).catch((err) => {
      logit.warn("TREE", `Failed to open ${node.path}: ${err?.message || err}`);
    });
  });
  parent.appendChild(li);
}

function renderTree(nodes, options = {}) {
  const tree = byId("file-tree");
  if (!tree) return;

  if (shouldUseVirtualScroll(nodes.length)) {
    const flat = flattenTree(nodes);
    if (!treeScroller) {
      treeScroller = createTreeScroller(tree);
    }
    treeScroller.setItems(flat, (item) => {
      const li = document.createElement("li");
      li.className = `tree-item ${item.isDir ? "folder" : "file"}`;
      li.dataset.path = item.path;

      const content = document.createElement("div");
      content.className = "tree-item-content";
      content.style.paddingLeft = `${item.depth * 16}px`;

      const icon = document.createElement("span");
      icon.className = `tree-icon ${item.isDir ? "is-dir" : "is-file"}`;

      const name = document.createElement("span");
      name.className = "tree-name";
      name.textContent = item.name;

      content.appendChild(icon);
      content.appendChild(name);
      li.appendChild(content);

      li.addEventListener("click", (event) => {
        event.stopPropagation();
        selectTreeItem(li);
        if (item.isDir) return;
        if (isMobileView()) {
          const url = new URL("viewport.html", window.location.href);
          url.searchParams.set("path", item.path);
          window.open(url.toString(), "_blank", "noopener");
          return;
        }
        openChapter(item.path, { record: true }).catch((err) => {
          logit.warn("TREE", `Failed to open ${item.path}: ${err?.message || err}`);
        });
      });

      return li;
    });

    if (options.persistExpansion !== false) persistExpandedFolders();
    markActiveContext();
    updateTreeShadingFallback();
    syncTreeToggleButtons();
    return;
  }

  tree.innerHTML = "";
  state.selectedTreeItem = null;
  for (const node of nodes || []) appendTreeNode(node, tree, options);
  if (options.persistExpansion !== false) persistExpandedFolders();
  markActiveTreePath(getActivePath());
  markActiveContext();
  updateTreeShadingFallback();
  syncTreeToggleButtons();
}

function expandAllFolders() {
  state.expandedFolders = collectFolderPaths(state.treeNodes);
  persistExpandedFolders();
  renderTree(state.treeNodes, { persistExpansion: true, autoExpandParents: false });
  statusCenter("Expanded all folders");
}

function collapseAllFolders() {
  state.expandedFolders.clear();
  persistExpandedFolders();
  // Avoid a full re-render here; that would immediately re-open the selected path's ancestors.
  const tree = byId("file-tree");
  if (tree) {
    tree.querySelectorAll("li.folder").forEach((folder) => {
      folder.classList.remove("expanded");
      const sub = folder.querySelector(":scope > ul");
      if (sub) sub.style.display = "none";
    });
    markActiveContext();
    updateTreeShadingFallback();
    syncTreeToggleButtons();
  }
  statusCenter("Collapsed all folders");
}

function applyTreeFilter() {
  const input = byId("file-search");
  const query = String(input?.value || "").trim().toLowerCase();
  if (!query) {
    renderTree(state.treeNodes, { persistExpansion: true, autoExpandParents: false });
    return;
  }
  const filtered = searchTree(query, state.treeNodes);
  renderTree(filtered, { persistExpansion: false, autoExpandParents: true });
  statusCenter(`File search: "${query}"`);
}

function toggleFileSearch() {
  const input = byId("file-search");
  if (!input) return;
  const isHidden = input.style.display === "none" || !input.style.display;
  if (isHidden) {
    input.style.display = "block";
    input.focus();
    input.select();
    return;
  }
  input.style.display = "none";
  input.value = "";
  renderTree(state.treeNodes, { persistExpansion: true, autoExpandParents: false });
  statusCenter("File search cleared");
}

function updateDirStats() {
  statusUpdateDirStats(null, state.treeNodes);
}

function syncPreviewHeadingIds() {
  tocController?.syncPreviewHeadingIds();
}

async function refreshOutline(fragment = "") {
  const path = getActivePath();
  const tab = getActiveTab();
  const isMarkdown = isMarkdownPath(path || tab?.path || tab?.name || "");
  state.activeHeadings = tab && isMarkdown ? await extractHeadings(tab.content || "") : [];
  tocController?.setHeadings(state.activeHeadings, { silentEmpty: !isMarkdown });
  syncPreviewHeadingIds();
  if (path) markActiveTreePath(path);
  updateUrl(path || "");
  if (fragment && getPreviewOn()) {
    setTimeout(() => {
      const frame = byId("preview-frame");
      if (frame?.contentWindow) {
        frame.contentWindow.postMessage({ type: "scrollToId", id: fragment }, "*");
      }
    }, 400);
  }
}

// ---------------------------------------------------------------------------
// Navigation — delegates to nav.js + editor.js with KBook post-steps
// ---------------------------------------------------------------------------

function updateUrl(path) {
  const url = new URL(window.location.href);
  if (path) url.searchParams.set("path", path);
  else url.searchParams.delete("path");
  url.hash = "";
  window.history.replaceState({}, "", url.toString());
}

/**
 * Post-navigation hook: update chapter TOC headings, tree highlight, and URL.
 * @param {string} [fragment] - optional heading slug to scroll to
 */
async function onNavigated(fragment) {
  await refreshOutline(fragment);
}

/**
 * Open a KBook chapter through the Monaco + preview pipeline.
 */
async function openChapter(path, opts = {}) {
  const normalizedPath = normalizePath(path);
  if (!normalizedPath) return;
  await navigateTo(normalizedPath, opts.line || null, null, { record: opts.record !== false });
  await onNavigated(opts.fragment || "");
}

async function kbookGoBack() {
  await goBack();
  await onNavigated("");
}

async function kbookGoForward() {
  await goForward();
  await onNavigated("");
}

function parseStartupTarget() {
  const fragment = String(window.location.hash || "").replace(/^#/, "").trim();
  return { fragment };
}

function findRootReadmePath() {
  return normalizePath(state.toc?.root_index?.path || "") ||
    (state.chapterMap.has("README.md") ? "README.md" : "");
}

// ---------------------------------------------------------------------------
// Editor toolbar actions (same as KBook app.js)
// ---------------------------------------------------------------------------

function saveActiveTab() {
  const tab = getActiveTab();
  if (!tab) return;
  downloadTextFile(tab.content ?? "", tab.name || "download.txt");
}

function triggerEditorSearch() {
  triggerFindInEditor(getEditor());
}

function toggleMinimap() {
  toggleEditorMinimap(getEditor(), monaco);
}

function toggleWordWrap() {
  toggleEditorWordWrap(getEditor(), monaco);
}

function scrollToTop() {
  if (getPreviewOn()) {
    byId("preview-frame")?.contentWindow?.postMessage({ type: "scrollTop" }, "*");
  } else {
    getEditor()?.setScrollPosition({ scrollTop: 0 });
  }
}

function scrollToBottom() {
  if (getPreviewOn()) {
    byId("preview-frame")?.contentWindow?.postMessage({ type: "scrollBottom" }, "*");
  } else {
    const ed = getEditor();
    if (!ed) return;
    const model = ed.getModel();
    if (model) ed.revealLine(model.getLineCount());
  }
}

function updateScrollToggleTitle() {
  const btn = byId("scroll-toggle");
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

function copyActivePath() {
  const path = getActivePath();
  if (path) copyPathWithToast(path, toast);
}

function openCurrentInViewport() {
  openPathInViewport(getActivePath(), window.location.href);
}

function openMainIndex() {
  const path = getActivePath();
  const url = new URL("index.html", window.location.href);
  if (path) url.searchParams.set("path", path);
  window.location.href = url.toString();
}

// ---------------------------------------------------------------------------
// Focus helpers
// ---------------------------------------------------------------------------

function focusHeadingFilter() {
  focusOutlineFilterInput({ ensureVisible: toggleOutlinePanel });
}

function focusTreeSearch() {
  const input = byId("file-search");
  if (!input) return;
  if (!input.style.display || input.style.display === "none") input.style.display = "block";
  input.focus();
  input.select();
}

// ---------------------------------------------------------------------------
// Toolbar binding
// ---------------------------------------------------------------------------

function bindToolbar() {
  window.addEventListener("kbook:active-tab-changed", () => {
    refreshOutline("").catch(() => {
      // Keep UI responsive even if heading extraction fails.
    });
  });

  byId("nav-back")?.addEventListener("click", () => kbookGoBack());
  byId("nav-forward")?.addEventListener("click", () => kbookGoForward());

  byId("open-repo")?.addEventListener("click", () => {
    const url = byId("open-repo")?.dataset?.url;
    if (url) window.open(url, "_blank", "noopener");
  });

  byId("open-help")?.addEventListener("click", () => {
    navigateTo("__kbook/USAGE.md").catch(() => toast("USAGE.md not found", "warn"));
  });

  byId("open-viewport")?.addEventListener("click", openCurrentInViewport);
  byId("open-index")?.addEventListener("click", openMainIndex);

  byId("scroll-toggle")?.addEventListener("click", toggleScrollDirection);
  updateScrollToggleTitle();

  byId("editor-save")?.addEventListener("click", saveActiveTab);
  byId("editor-search")?.addEventListener("click", triggerEditorSearch);
  byId("editor-wrap")?.addEventListener("click", toggleWordWrap);
  byId("editor-minimap")?.addEventListener("click", toggleMinimap);
  byId("editor-preview")?.addEventListener("click", async () => {
    togglePreview();
    // Re-render headings in case preview mode changed (no-op if same content)
    const tab = getActiveTab();
    if (tab) {
      const isMarkdown = isMarkdownPath(tab.path || tab.name || "");
      state.activeHeadings = isMarkdown ? await extractHeadings(tab.content || "") : [];
      tocController?.setHeadings(state.activeHeadings, { silentEmpty: !isMarkdown });
      syncPreviewHeadingIds();
    }
  });
  byId("editor-copy-path")?.addEventListener("click", copyActivePath);

  byId("clear-cache")?.addEventListener("click", async () => {
    await clearClientStateAndReload({ invalidateTocCache, toast, logit });
  });

  byId("file-search")?.addEventListener("input", applyTreeFilter);

  bindActionButton(byId("search-toggle"), toggleFileSearch);
  bindActionButton(byId("tree-expand-all"), expandAllFolders);
  bindActionButton(byId("tree-collapse-all"), collapseAllFolders);
}

function initToc() {
  tocController = createTocController({
    listElement: byId("chapter-toc-list"),
    filterInputElement: byId("chapter-toc-filter"),
    filterButtonElement: byId("chapter-toc-go-btn"),
    getPreviewOn,
    getPreviewFrame: () => byId("preview-frame"),
    onEditorHeadingNavigate: (heading) => {
      const ed = getEditor();
      if (!ed || !heading?.line) return;
      ed.revealLineInCenter(heading.line);
      ed.setPosition({ lineNumber: heading.line, column: 1 });
      ed.focus();
      blinkLine(heading.line);
    }
  });
}

// ---------------------------------------------------------------------------
// Keymaps
// ---------------------------------------------------------------------------

function registerKeymaps() {
  const handlers = {
    saveActiveTab,
    openGrepOutline: focusTreeSearch,
    openGrepFile: focusHeadingFilter,
    focusExplorerSearch: focusTreeSearch,
    focusOutlineFilter: focusHeadingFilter,
    reopenLastClosedTab,
    switchToNextTab,
    closeActiveTab,
    toggleOutlinePanel,
    togglePreview,
    toggleMinimap,
    toggleWordWrap,
    openInNewTab: openCurrentInViewport,
    goBack: kbookGoBack,
    goForward: kbookGoForward,
    switchToTabByIndex,
    activateOutlineTagsTab: focusHeadingFilter
  };

  setEditorShellKeymapHandlers(handlers);

  state.unregisterKeymaps?.();
  state.unregisterKeymaps = registerWindowKeymaps({
    handlers
  });
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

async function boot() {
  loadPreferences();
  initToc();
  bindToolbar();
  registerKeymaps();

  if (!IS_VIEWPORT) showTreeSkeleton();

  try {
    state.toc = await loadToc();
    const entries = Array.isArray(state.toc?.entries) ? state.toc.entries : [];
    buildChapterMap(entries);
    state.treeNodes = buildTreeNodesFromChapters();
    renderTree(state.treeNodes, { persistExpansion: true, autoExpandParents: false });
    updateDirStats();
    if (!IS_VIEWPORT) hideTreeSkeleton();
  } catch (error) {
    statusCenter(`Failed to load TOC: ${error.message}`);
    toast("TOC unavailable", "error");
    statusUpdateDirStats(null, []);
    if (!IS_VIEWPORT) hideTreeSkeleton();
  }

  await createMonacoEditor();
  preloadMonaco();

  // Restore previously open tabs (reads kbook.openTabs from localStorage)
  await restoreOpenTabs(async (path) => {
    await navigateTo(path, null, null, { record: false });
  });

  const startup = parseStartupTarget();
  if (!getActivePath()) {
    const rootReadmePath = findRootReadmePath();
    if (rootReadmePath) {
      await openChapter(rootReadmePath, { record: false, fragment: startup.fragment });
      setPreviewOn(true);
      applyPreviewVisibility();
      updatePreviewButtonVisibility();
      try {
        await renderPreview();
      } catch {
        // Preview render can fail transiently; navigation state is already valid.
      }
    } else {
      await onNavigated(startup.fragment);
    }
  } else {
    await onNavigated(startup.fragment);
  }

  if (IS_VIEWPORT) {
    byId("open-index")?.classList.remove("is-hidden");
  }

  updateNavButtons();
  logit.info("KBOOK", "KBook runtime ready (Monaco + preview pipeline active)");
}

window.addEventListener("load", () => {
  boot().catch((error) => {
    statusCenter(`Boot failed: ${error.message}`);
    toast("KBook initialization failed", "error");
    logit.error("KBOOK", `Boot failed: ${error?.message || error}`);
  });
});

window.addEventListener("message", (event) => {
  try {
    if (event?.data?.type === "kbook-md-ready") {
      syncPreviewHeadingIds();
    }
  } catch {
    // Ignore malformed message payloads from other frames.
  }
});
