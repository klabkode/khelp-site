// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : vim.js
// Description : Provides Monaco language registration for Vimscript syntax.
// -----------------------------------------------------------------------------

/**
 *  - Comments starting with " (double-quote) → comment (green)
 *  - Keywords (if/else/endif, function/endfunc, let, set, call, command, map…)
 *  - Variables g:/b:/s:/l:/a:/v:  → token 'type' (yellow)
 *  - Options &option and registers @x → token 'type'
 *  - Function calls foo(...) → token 'keyword' (so they pop)
 */
import { logit } from "../../lib/status.js";

export function registerVimLanguage(monaco) {
  logit.info('LANG', "registering Monaco language: vim");

  monaco.languages.register({
    id: "vim",
    extensions: [".vim"],
    filenames: [".vimrc", "_vimrc", "vimrc", "gvimrc", ".gvimrc"],
    aliases: ["Vim", "vim", "vimscript"],
    mimetypes: ["text/x-vim"],
  });

  monaco.languages.setLanguageConfiguration("vim", {
    comments: { lineComment: '"' },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\s\`\~\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\\\|\;\:\'\"\<\>\,\.\/\?]+)/g,
  });

  monaco.languages.setMonarchTokensProvider("vim", {
    defaultToken: "",
    ignoreCase: true,

    keywords: [
      "if", "elseif", "else", "endif", "while", "endwhile", "for", "endfor",
      "try", "catch", "finally", "endtry",
      "function", "function!", "endfunction", "endfunc", "return", "call",
      "let", "unlet", "lockvar", "unlockvar",
      "set", "setlocal", "setglobal",
      "execute", "echo", "echom", "echomsg", "echoerr", "silent", "redir",
      "augroup", "autocmd", "doautocmd", "doautoall",
      "map", "nmap", "vmap", "xmap", "smap", "imap", "omap", "cmap", "tmap",
      "nnoremap", "vnoremap", "xnoremap", "snoremap", "inoremap", "onoremap", "cnoremap", "tnoremap",
      "command", "command!",
      "tabnew", "tabnext", "tabprev", "tabclose", "bdelete", "bd", "file", "edit", "write", "wq", "quit", "qall", "source"
    ],
    builtins: [
      "expand", "system", "empty", "len", "split", "join", "getline", "setline", "add", "remove",
      "exists", "has", "isdirectory", "fnamemodify", "substitute", "match", "matchstr", "printf",
    ],

    tokenizer: {
      root: [
        [/^\s*".*$/, "comment"],
        [/".*$/, "comment"],

        [/\b\d+\b/, "number"],

        [/'([^'\\]|\\.)*'/, "string"],
        [/"([^"\\]|\\.)*"/, "string"],

        [/\b[gbslav]:[A-Za-z_][A-Za-z0-9_]*/, "type"],
        [/&[A-Za-z_][A-Za-z0-9_]*/, "type"],
        [/@[A-Za-z0-9"%-]/, "type"],

        [/\b[A-Za-z_][A-Za-z0-9_]*\s*(?=\()/, {
          cases: {
            "@builtins": "keyword",
            "@default": "keyword"
          }
        }],

        [/\b[!A-Za-z_][A-Za-z0-9_]*\b/, {
          cases: {
            "@keywords": "string",
            "@default": "keyword"
          }
        }],

        [/==|!=|<=|>=|=~|!~|[+\-*/%]=?|[<>]|[,.;]|::/, "operator"],

        [/[{}()\[\]]/, "delimiter"],
        [/[A-Za-z_][A-Za-z0-9_]*/, "identifier"],
        [/\s+/, ""],
      ],
    },
  });

  logit.info('VIM', "Monaco vim language registered");
}
