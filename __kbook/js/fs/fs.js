// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : fs.js
// Description : Provides file-system loading helpers for toc and file content.
// -----------------------------------------------------------------------------
import { logit } from "../lib/status.js";
import { xFetch } from "../lib/utils.js";

let tocPromise = null;

export function invalidateTocCache() {
  tocPromise = null;
}

export async function loadToc(options = {}) {
  const { force = false } = options;
  if (force) invalidateTocCache();
  if (tocPromise) return tocPromise;

  tocPromise = (async () => {
    const res = await xFetch("__kbook/toc.json", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to load toc.json: HTTP ${res.status}`);
    }
    return res.json();
  })();

  try {
    return await tocPromise;
  } catch (error) {
    tocPromise = null;
    throw error;
  }
}

function collectChapters(entries, out = []) {
  if (!Array.isArray(entries)) return out;
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    if (entry.type === "chapter") {
      out.push(entry);
      collectChapters(entry.children || [], out);
    }
  }
  return out;
}

function buildTreeFromChapterPaths(paths) {
  const root = { type: "dir", name: "", path: "", children: [] };
  const dirs = new Map([["", root]]);

  for (const filePath of paths) {
    const segments = String(filePath).split("/").filter(Boolean);
    if (!segments.length) continue;

    let parent = root;
    let dirPath = "";
    for (let i = 0; i < segments.length - 1; i += 1) {
      const part = segments[i];
      dirPath = dirPath ? `${dirPath}/${part}` : part;
      let dir = dirs.get(dirPath);
      if (!dir) {
        dir = { type: "dir", name: part, path: dirPath, children: [] };
        parent.children.push(dir);
        dirs.set(dirPath, dir);
      }
      parent = dir;
    }

    const name = segments[segments.length - 1];
    parent.children.push({ type: "file", name, path: filePath });
  }

  const sortNodes = (nodes) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return String(a.name).localeCompare(String(b.name));
    });
    for (const node of nodes) {
      if (node.type === "dir" && Array.isArray(node.children)) {
        sortNodes(node.children);
      }
    }
  };
  sortNodes(root.children);

  return root.children;
}

function countDirectories(nodes) {
  const stack = Array.isArray(nodes) ? [...nodes] : [];
  let count = 0;
  while (stack.length) {
    const node = stack.pop();
    if (!node || node.type !== "dir") continue;
    count += 1;
    if (Array.isArray(node.children) && node.children.length) {
      stack.push(...node.children);
    }
  }
  return count;
}

export async function loadFullTree() {
  try {
    const payload = await loadToc();
    const entries = Array.isArray(payload?.entries)
      ? payload.entries
      : (Array.isArray(payload) ? payload : null);
    if (!entries) throw new Error("Invalid toc.json format");

    const chapters = collectChapters(entries, []);
    const paths = Array.from(
      new Set(
        chapters
          .map((ch) => String(ch.path || "").trim())
          .filter((path) => Boolean(path))
      )
    );
    const items = buildTreeFromChapterPaths(paths);
    const meta = { files: paths.length, directories: countDirectories(items) };
    return { items, meta };
  } catch (error) {
    logit.error('FILE', `Failed to load toc.json: ${error?.message || error}`);
    throw error;
  }
}
export async function loadFile(path) {
  const res = await xFetch(`${path}`);
  if (!res.ok) throw new Error(`Fetch failed: ${path}`);
  const text = await res.text();
  const name = path.split("/").pop();
  return { name, path, content: text };
}
