// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : editor/tools.js
// Description : Shared editor toolbar and utility actions used by app/viewport.
// -----------------------------------------------------------------------------

export function downloadTextFile(content, filename = "download.txt") {
  const blob = new Blob([String(content ?? "")], { type: "text/plain;charset=utf-8" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 0);
  anchor.remove();
}

export function triggerFindInEditor(editor) {
  if (!editor) return;
  editor.trigger("keyboard", "actions.find", null);
}

export function toggleEditorMinimap(editor, monacoApi) {
  if (!editor || !monacoApi?.editor?.EditorOption) return;
  const current = editor.getOption(monacoApi.editor.EditorOption.minimap).enabled;
  editor.updateOptions({ minimap: { enabled: !current } });
}

export function toggleEditorWordWrap(editor, monacoApi) {
  if (!editor || !monacoApi?.editor?.EditorOption) return;
  const current = editor.getOption(monacoApi.editor.EditorOption.wordWrap);
  editor.updateOptions({ wordWrap: current === "on" ? "off" : "on" });
}

export function openPathInViewport(path, locationHref = window.location.href) {
  if (!path) return;
  const url = new URL("viewport.html", locationHref);
  url.searchParams.set("path", path);
  window.open(url.toString(), "_blank", "noopener");
}

export async function clearClientStateAndReload({
  clearCachedTree,
  clearCachedSymbols,
  invalidateTocCache,
  toast,
  logit,
  preserveKeys = []
} = {}) {
  try {
    logit?.info?.("CACHE", "Clearing application cache...");

    if (typeof clearCachedTree === "function") await clearCachedTree();
    if (typeof clearCachedSymbols === "function") await clearCachedSymbols();
    if (typeof invalidateTocCache === "function") invalidateTocCache();

    const keysToPreserve = new Set(preserveKeys);
    for (const key of Object.keys(localStorage)) {
      if (keysToPreserve.has(key)) continue;
      try {
        localStorage.removeItem(key);
        logit?.debug?.("CACHE", `Cleared localStorage: ${key}`);
      } catch {
        // ignore storage errors for individual keys
      }
    }

    toast?.("Cache cleared. Reloading page...", "info");
    setTimeout(() => window.location.reload(), 500);
  } catch (error) {
    logit?.error?.("CACHE", `Error clearing cache: ${error?.message}`);
    toast?.("Error clearing cache. Try refreshing the page.", "error");
  }
}
