// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : permalink.js
// Description : Shared copy helpers for path and permalink actions.
// -----------------------------------------------------------------------------

export async function copyTextToClipboard(text) {
  const value = String(text ?? "");
  if (!value) return false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to legacy fallback.
  }

  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-9999px";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.focus();
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return Boolean(ok);
  } catch {
    return false;
  }
}

export function buildPermalink(path, locationHref = window.location.href) {
  const normalizedPath = String(path || "").trim();
  if (!normalizedPath) return "";
  const url = new URL(locationHref);
  url.searchParams.set("path", normalizedPath);
  url.hash = "";
  return url.toString();
}

export async function copyPathWithToast(path, toastFn) {
  const copied = await copyTextToClipboard(path);
  toastFn?.(copied ? "File path copied to clipboard" : "Failed to copy path", copied ? "info" : "error");
  return copied;
}

export async function copyPermalinkWithToast(path, toastFn, locationHref = window.location.href) {
  const permalink = buildPermalink(path, locationHref);
  if (!permalink) return false;
  const copied = await copyTextToClipboard(permalink);
  toastFn?.(copied ? "Permalink copied." : "Failed to copy permalink", copied ? "info" : "error");
  return copied;
}
