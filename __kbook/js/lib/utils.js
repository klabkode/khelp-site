// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : utils.js
// Description : Provides shared utility helpers for fetch, strings, and concurrency.
// -----------------------------------------------------------------------------

import { logit } from "./status.js";

const _escapeHtmlCache = new Map();
const _escapeHtmlCacheSize = 256;

/**
 * Wrapper around fetch() to track all file downloads
 * Logs every fetch operation to console for debugging
 *
 * @param {string} url - URL to fetch
 * @param {object} opts - Fetch options (passed through unchanged)
 * @return {Promise<Response>} - Fetch response
 */
export async function xFetch(url, opts = {}) {
  logit.info('FETCH', `${url}`);
  return fetch(url, opts);
}

export function escapeHtml(s) {
  const str = String(s);

  if (_escapeHtmlCache.has(str)) {
    return _escapeHtmlCache.get(str);
  }

  const escaped = str.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));

  if (_escapeHtmlCache.size >= _escapeHtmlCacheSize) {
    const firstKey = _escapeHtmlCache.keys().next().value;
    _escapeHtmlCache.delete(firstKey);
  }
  _escapeHtmlCache.set(str, escaped);

  return escaped;
}
export function basename(p) {
  const s = String(p).replace(/\\/g, '/');
  const i = s.lastIndexOf('/');
  return i >= 0 ? s.slice(i + 1) : s;
}
export function dirname(p) {
  const s = String(p).replace(/\\/g, '/');
  const i = s.lastIndexOf('/');
  return i >= 0 ? s.slice(0, i) : '';
}
export function normalizePath(p) {
  const parts = [];
  for (const seg of String(p).split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts.join('/');
}
export function joinContinuedLines(raw) {
  const out = [];
  let buf = '';
  for (const line of raw) {
    const l = String(line);
    if (/[\\]\s*$/.test(l)) {
      buf += l.replace(/[\\]\s*$/, ' ');
    } else {
      out.push((buf + l).trim());
      buf = '';
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}
export function unquote(s) {
  const m = String(s).match(/^(['"])(.*)\1$/);
  return m ? m[2] : String(s);
}
export function splitMakeArgs(s) {
  const re = /"([^"]+)"|'([^']+)'|([^\s]+)/g;
  const parts = [];
  let m;
  while ((m = re.exec(s))) parts.push(m[1] || m[2] || m[3]);
  return parts;
}
export function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
export async function limitConcurrency(jobs, limit = 8) {
  const queue = [...jobs];
  const running = [];
  const results = [];
  while (queue.length || running.length) {
    while (running.length < limit && queue.length) {
      const job = queue.shift();
      const p = job().then(r => results.push(r)).finally(() => {
        const i = running.indexOf(p);
        if (i >= 0) running.splice(i, 1);
      });
      running.push(p);
    }
    const tick = Promise.race(running.length ? running : [Promise.resolve()]);
    await tick;
  }
  return results;
}
export function shortenPath(p) {
  const parts = String(p).split("/");
  if (parts.length <= 3) return p;
  return `${parts.slice(0, 1)}/…/${parts.slice(-2).join("/")}`;
}
export function toB64Unicode(s) {
  try { return btoa(unescape(encodeURIComponent(s))); }
  catch { return btoa(s); }
}
