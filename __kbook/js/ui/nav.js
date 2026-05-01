// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : nav.js
// Description : Provides editor navigation history and file routing helpers.
// -----------------------------------------------------------------------------
import { loadFile } from "../fs/fs.js";
import { openTab, setActiveTab, getActivePath } from "../editor/editor.js";
import { statusCenter, toast, logit } from "../lib/status.js";

const MAX_HISTORY = 20;
const backStack = [];
const fwdStack = [];

function currentLocation() {
  const p = getActivePath();
  const ed = monaco && monaco.editor && monaco.editor.getEditors ? monaco.editor.getEditors()[0] : null;
  const pos = ed ? ed.getPosition() : null;
  return (!p) ? null : { path: p, line: pos ? pos.lineNumber : null, pattern: null };
}
function sameLoc(a, b) {
  if (!a || !b) return false;
  return a.path === b.path && (a.line || null) === (b.line || null) && (a.pattern || null) === (b.pattern || null);
}
function pushBack(loc, opts = { clearForward: true }) {
  if (!loc) return;
  if (backStack.length && sameLoc(backStack[backStack.length - 1], loc)) return;
  backStack.push(loc);
  while (backStack.length > MAX_HISTORY) backStack.shift();
  if (opts.clearForward) fwdStack.length = 0;
  updateNavButtons();
}
function pushForward(loc) {
  if (!loc) return;
  if (fwdStack.length && sameLoc(fwdStack[fwdStack.length - 1], loc)) return;
  fwdStack.push(loc);
  while (fwdStack.length > MAX_HISTORY) fwdStack.shift();
  updateNavButtons();
}
export function updateNavButtons() {
  const backBtn = document.getElementById('nav-back');
  const fwdBtn = document.getElementById('nav-forward');
  if (backBtn) backBtn.style.opacity = backStack.length ? '1' : '0.5';
  if (fwdBtn) fwdBtn.style.opacity = fwdStack.length ? '1' : '0.5';
}

export async function goBack() {
  if (!backStack.length) { return; }
  const here = currentLocation();
  const target = backStack.pop();
  if (here) pushForward(here);
  await navigateTo(target.path, target.line, target.pattern, { record: false });
  statusCenter(`Back: ${target.path}:${target.line || '?'}`);
}
export async function goForward() {
  if (!fwdStack.length) { return; }
  const here = currentLocation();
  const target = fwdStack.pop();
  if (here) pushBack(here, { clearForward: false });
  await navigateTo(target.path, target.line, target.pattern, { record: false });
  statusCenter(`Forward: ${target.path}:${target.line || '?'}`);
}

export async function navigateTo(path, line = null, pattern = null, opts = { record: true }) {
  if (opts.record) {
    const origin = currentLocation();
    if (origin) pushBack(origin);
  }
  try {
    const file = await loadFile(path);
    openTab(file, { line, pattern });
    setActiveTab(path, { line, pattern });
    logit.info('FILE', `Open: ${file.name}`);
  } catch (e) {
    logit.error('NAV', `Error loading file: ${path}: ${e?.message || e}`);
    toast(`Error loading file: ${path}`, "error", 3000);
  }
  updateNavButtons();
}

document.getElementById('nav-back')?.addEventListener('click', goBack);
document.getElementById('nav-forward')?.addEventListener('click', goForward);
