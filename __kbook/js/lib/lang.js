// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : lang.js
// Description : Provides language detection and filename-extension mapping helpers.
// -----------------------------------------------------------------------------
export function detectLanguageByFilename(name) {
  const n = String(name || "");
  if (/^Dockerfile$/i.test(n)) return "dockerfile";
  if (/^(Doxyfile|doxygen\.cfg)$/i.test(n)) return "ini";
  if (/\.doxy$/i.test(n)) return "ini";
  if (/^Makefile$/i.test(n)) return "makefile";
  if (/\.mk$/i.test(n)) return "makefile";
  if (/\.make$/i.test(n)) return "makefile";
  if (/^\.(bashrc)$/i.test(n)) return "shell";
  if (/^(\.?vimrc|_vimrc|gvimrc|\.gvimrc)$/i.test(n)) return "vim";
  return null;
}
export function getLanguageFromExt(ext) {
  const map = {
    js: "javascript", py: "python", pyw: "python", html: "html", css: "css", json: "json",
    md: "markdown", txt: "plaintext", java: "java", c: "c", h: "c", cpp: "cpp", cs: "csharp",
    php: "php", rb: "ruby", go: "go", rs: "rust", ts: "typescript", sh: "shell", aliases: "shell",
    rc: "shell", in: "shell", vim: "vim", lua: "lua", cfg: "ini", yml: "yaml",
    toml: "ini", yaml: "yaml", makefile: "makefile", tsx: "typescriptreact", jsx: "javascriptreact",
    bash: "shell", zsh: "shell", ksh: "shell", mjs: "javascript", cjs: "javascript",
    dockerfile: "dockerfile", ini: "ini", mk: "makefile", in: "sh", inc: "ini", make: "makefile", odl: "c", uc: "c"
  };
  return map[ext] || "plaintext";
}
