// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : toc.js
// Description : Shared chapter heading parsing and outline TOC rendering.
// -----------------------------------------------------------------------------
import { logit } from "../lib/status.js";

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

export function slugify(text) {
  const base = String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=[\]{}|;:'",.<>/?]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "section";
}

function normalizeHeadingText(text) {
  return String(text || "")
    .replace(/\s+#+\s*$/, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim();
}

let cachedMdParser = null;

function getMarkdownParser() {
  if (cachedMdParser) return cachedMdParser;
  if (typeof window === "undefined" || typeof window.markdownit !== "function") return null;
  cachedMdParser = window.markdownit({
    html: false,
    linkify: true,
    breaks: false
  });
  return cachedMdParser;
}

async function extractHeadingsWithMarkdownIt(content) {
  const md = getMarkdownParser();
  if (!md) {
    logit("ERROR", "TOC", "md is NULL");
    return null;
  }

  const headings = [];
  const seen = {};
  let tokens = null;

  await Promise.resolve();

  try {
    tokens = md.parse(String(content || ""), {});
  } catch {
    logit("ERROR", "TOC", "tokens is NULL");
    return null;
  }

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (!token || token.type !== "heading_open") continue;

    const level = Number(String(token.tag || "").replace(/^h/i, ""));
    if (!Number.isFinite(level) || level < 1 || level > 6) continue;

    const inline = tokens[i + 1];
    if (!inline || inline.type !== "inline") continue;

    const line = Array.isArray(token.map) && Number.isFinite(token.map[0]) ? token.map[0] + 1 : 0;
    pushHeading(headings, seen, inline.content || "", level, line);
  }

  return headings;
}

function pushHeading(headings, seen, title, level, line) {
  const rawTitle = normalizeHeadingText(title);
  if (!rawTitle) return;
  const base = slugify(rawTitle);
  const count = seen[base] || 0;
  seen[base] = count + 1;
  const id = count === 0 ? base : `${base}-${count}`;
  headings.push({ id, title: rawTitle, level, line });
}

export async function extractHeadings(content) {
  return await extractHeadingsWithMarkdownIt(content) ?? [];
}

export function isMarkdownPath(path) {
  return /\.(md|markdown)$/i.test(String(path || ""));
}

export function createTocController(options = {}) {
  const {
    listElement,
    filterInputElement,
    filterButtonElement,
    getPreviewOn,
    getPreviewFrame,
    onEditorHeadingNavigate
  } = options;

  let headings = [];
  let suppressEmptyState = false;

  function clearActiveHeading() {
    document.querySelectorAll(".kbook-heading-entry.is-active").forEach((row) => {
      row.classList.remove("is-active");
    });
  }

  function applyFilter() {
    const query = String(filterInputElement?.value || "").trim().toLowerCase();
    document.querySelectorAll(".kbook-heading-entry").forEach((row) => {
      const li = row.parentElement;
      if (!li) return;
      li.style.display = !query || row.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  }

  function syncPreviewHeadingIds() {
    if (typeof getPreviewOn !== "function" || !getPreviewOn()) return;
    const frame = typeof getPreviewFrame === "function" ? getPreviewFrame() : null;
    if (!frame?.contentWindow) return;
    const ids = headings.map((heading) => heading.id);
    frame.contentWindow.postMessage({ type: "kbook:setHeadingIds", ids }, "*");
  }

  function render() {
    if (!listElement) return;
    listElement.innerHTML = "";

    if (!headings.length) {
      if (suppressEmptyState) {
        applyFilter();
        return;
      }
      const empty = document.createElement("li");
      empty.className = "kbook-empty";
      empty.textContent = "No headings in this chapter.";
      listElement.appendChild(empty);
      applyFilter();
      return;
    }

    for (const heading of headings) {
      const li = document.createElement("li");
      const row = document.createElement("div");
      row.className = "kbook-heading-entry";
      row.dataset.level = String(heading.level);
      row.dataset.id = heading.id;
      row.dataset.clickable = "true";
      row.innerHTML = `<span class="codicon codicon-symbol-method"></span><span class="kbook-heading-title">${escapeHtml(heading.title)}</span>`;
      row.addEventListener("click", () => {
        clearActiveHeading();
        row.classList.add("is-active");
        if (typeof getPreviewOn === "function" && getPreviewOn()) {
          const frame = typeof getPreviewFrame === "function" ? getPreviewFrame() : null;
          if (frame?.contentWindow) {
            frame.contentWindow.postMessage({ type: "scrollToId", id: heading.id }, "*");
          }
        } else if (typeof onEditorHeadingNavigate === "function") {
          onEditorHeadingNavigate(heading);
        }
      });
      li.appendChild(row);
      listElement.appendChild(li);
    }

    applyFilter();
  }

  function setHeadings(nextHeadings, options = {}) {
    headings = Array.isArray(nextHeadings) ? nextHeadings : [];
    suppressEmptyState = Boolean(options.silentEmpty);
    render();
  }

  if (filterInputElement) {
    filterInputElement.addEventListener("input", applyFilter);
  }
  if (filterButtonElement) {
    filterButtonElement.addEventListener("click", applyFilter);
  }

  return {
    setHeadings,
    applyFilter,
    syncPreviewHeadingIds
  };
}
