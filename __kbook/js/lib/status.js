// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : status.js
// Description : Provides status bar updates, toasts, and structured logging helpers.
// -----------------------------------------------------------------------------
import { shortenPath } from "../lib/utils.js";

let __toastTimer = null;
let __logStartTime = performance.now();

const PREFIX_WIDTH = 6;

/**
 * Unified logging function with format: HH:MM:SS.mmmm | LEVEL | PREFIX | Message
 * Matches build.py logit() format for consistency across toolchain
 * Supports multiple call patterns:
 *   logit(msg)                          → logit('INFO', '', msg)
 *   logit(prefix, msg)                  → logit('INFO', prefix, msg)
 *   logit(level, prefix, msg)           → full form
 * @param level_or_msg Log level or message (auto-detected)
 * @param prefix_or_msg Prefix or message (auto-detected)
 * @param msg Message text
 */
export function logit(level_or_msg = '', prefix_or_msg = '', msg = '') {
  const VALID_LEVELS = ['INFO', 'DEBUG', 'WARN', 'ERROR', 'TRACE'];

  let level, prefix, message;

  if (!prefix_or_msg && !msg) {
    level = 'INFO';
    prefix = '';
    message = level_or_msg;
  } else if (!msg) {
    if (VALID_LEVELS.includes(String(level_or_msg).toUpperCase())) {
      level = level_or_msg;
      prefix = '';
      message = prefix_or_msg;
    } else {
      level = 'INFO';
      prefix = level_or_msg;
      message = prefix_or_msg;
    }
  } else {
    level = level_or_msg;
    prefix = prefix_or_msg;
    message = msg;
  }

  const now = performance.now() - __logStartTime;
  const totalMs = Math.floor(now);
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = Math.floor(totalMs % 1000);
  const elapsed = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(4, '0')}`;
  const levelUpper = String(level).toUpperCase().padEnd(5);
  const prefixUpper = String(prefix).toUpperCase().padEnd(PREFIX_WIDTH).slice(0, PREFIX_WIDTH);

  const formattedMsg = `${elapsed} | ${levelUpper} | ${prefixUpper} | ${message}`;

  if (level.toLowerCase() === 'error') console.error(formattedMsg);
  else if (level.toLowerCase() === 'warn') console.warn(formattedMsg);
  else if (level.toLowerCase() === 'debug') console.debug(formattedMsg);
  else console.log(formattedMsg);
}

logit.info = (prefix = '', msg = '') => logit('INFO', prefix, msg);
logit.debug = (prefix = '', msg = '') => logit('DEBUG', prefix, msg);
logit.warn = (prefix = '', msg = '') => logit('WARN', prefix, msg);
logit.error = (prefix = '', msg = '') => logit('ERROR', prefix, msg);


export function toast(msg, type = 'info', timeout = 2200) {
  logit(`TOAST [${type.toUpperCase()}]: ${msg}`, 'INFO');
  const el = document.getElementById('toast');
  if (!el) return;
  el.className = '';
  el.textContent = String(msg || '');
  el.classList.add(type);
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(__toastTimer);
  __toastTimer = setTimeout(() => {
    el.classList.remove('show', 'info', 'warn', 'error');
  }, timeout);
  statusCenter(msg);
}

export function statusLeft(text) {
  const el = document.getElementById('status-left');
  if (el) el.innerHTML = text;
}
export function statusCenter(text) {
  const el = document.getElementById('status-center');
  if (el) el.textContent = text;
}
export function statusRight(text) {
  const el = document.getElementById('status-right');
  if (el) el.textContent = text;
}

export function updateDirStats(meta, items) {
  const el = document.getElementById('dirstats');
  if (!el) return;

  let files = meta?.files;
  let dirs = meta?.directories;

  if (files == null || dirs == null) {
    const stack = Array.isArray(items) ? [...items] : [];
    let fileCount = 0;
    let dirCount = 0;

    while (stack.length) {
      const node = stack.pop();
      if (!node) continue;
      if (node.type === 'dir') {
        dirCount += 1;
        if (node.children?.length) stack.push(...node.children);
      } else if (node.type === 'file') {
        fileCount += 1;
      }
    }

    files = files ?? fileCount;
    dirs = dirs ?? dirCount;
  }

  el.textContent = `${dirs ?? 0} Directories ${files ?? 0} Files`;
}

export function setFileStatus(path, lang) {
  statusLeft(`<span class="codicon codicon-file"></span> ${lang || 'plaintext'}`);
}

export function updateCursorStatus(editor) {
  if (!editor) return;
  const pos = editor.getPosition();
  const wrap = editor.getOption(monaco.editor.EditorOption.wordWrap);
  const mini = editor.getOption(monaco.editor.EditorOption.minimap).enabled;
  statusRight(`Ln ${pos?.lineNumber || 1}, Col ${pos?.column || 1} • WRAP: ${wrap === 'on' ? 'ON' : 'OFF'} • MINIMAP: ${mini ? 'ON' : 'OFF'}`);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));
}
