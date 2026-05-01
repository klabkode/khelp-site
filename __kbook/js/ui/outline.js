// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : outline.js
// Description : Shared outline panel state and focus helpers.
// -----------------------------------------------------------------------------

const DEFAULT_STORAGE_KEY = "ui:outlinePanelHidden";

function updateToggleButton(hidden, buttonId = "toggle-outline-panel") {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  if (!btn.classList.contains("codicon")) btn.classList.add("codicon");
  btn.classList.remove("codicon-layout-sidebar-right-off", "codicon-layout-sidebar-right");
  btn.classList.add(hidden ? "codicon-layout-sidebar-right-off" : "codicon-layout-sidebar-right");
  btn.title = hidden ? "Show Outline panel" : "Hide Outline panel";
  btn.setAttribute("aria-pressed", String(!hidden));
}

export function getOutlinePanelHidden(storageKey = DEFAULT_STORAGE_KEY) {
  const value = localStorage.getItem(storageKey);
  return value === "true";
}

export function setOutlinePanelHidden(hidden, options = {}) {
  const {
    persist = false,
    storageKey = DEFAULT_STORAGE_KEY,
    dispatchResize = true,
    buttonId = "toggle-outline-panel"
  } = options;

  document.body.classList.toggle("outline-hidden-user", Boolean(hidden));
  updateToggleButton(Boolean(hidden), buttonId);

  if (persist) {
    localStorage.setItem(storageKey, String(Boolean(hidden)));
  }

  if (dispatchResize) {
    try { window.dispatchEvent(new Event("resize")); } catch { /* ignore */ }
  }
}

export function toggleOutlinePanel(options = {}) {
  const isHidden = document.body.classList.contains("outline-hidden-user");
  setOutlinePanelHidden(!isHidden, options);
}

export function focusOutlineFilterInput(options = {}) {
  const {
    inputId = "chapter-toc-filter",
    ensureVisible = null,
    select = true
  } = options;

  const input = document.getElementById(inputId);
  if (!input) return;
  if (typeof ensureVisible === "function" && document.body.classList.contains("outline-hidden-user")) {
    ensureVisible();
  }
  input.focus();
  if (select) input.select();
}
