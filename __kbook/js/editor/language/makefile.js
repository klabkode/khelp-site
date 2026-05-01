// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : makefile.js
// Description : Provides Monaco language registration for Makefile syntax.
// -----------------------------------------------------------------------------

/**
 * Monaco language support for Makefiles with:
 *  - Recipe comment lines (spaces + "#"/"@#") -> whole line comment (green)
 *  - Variables $(...) / ${...} -> 'type' (dark yellow in vs-dark)
 *  - Targets and prerequisites -> 'type' (dark yellow)
 *  - Normal coloring in if/else blocks (only standard '#' comments)
 */
import { logit } from "../../lib/status.js";

export function registerMakefileLanguage(monaco) {
  logit.info('LANG', "registering Monaco language: makefile");

  monaco.languages.register({
    id: "makefile",
    extensions: [".mk"],
    filenames: ["Makefile", "makefile", "GNUmakefile", "BSDmakefile"],
    aliases: ["Makefile", "make", "makefile"],
    mimetypes: ["text/x-makefile"],
  });

  monaco.languages.setLanguageConfiguration("makefile", {
    comments: { lineComment: "#" },
    brackets: [],
    autoClosingPairs: [],
    surroundingPairs: [],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\<\>\,\.\/\?\s]+)/g,
    folding: {
      offSide: true,
      markers: { start: /^\s*(define)\b/, end: /^\s*(endef)\b/ },
    },
    onEnterRules: [
      {
        beforeText: /^\t.+$/,
        action: { indentAction: monaco.languages.IndentAction.None, appendText: "\t" },
      },
    ],
  });

  monaco.languages.setMonarchTokensProvider("makefile", {
    defaultToken: "",
    ignoreCase: false,

    tokenizer: {
      root: [
        [/#.*$/, "comment"],

        [/^\s*(?:define|endef)\b.*$/, "keyword"],

        [/^\s*(?:include|sinclude|override|export|unexport|if|ifdef|ifndef|ifeq|ifneq|else|endif)\b.*$/, "keyword"],

        [/^\t[ \t]*[+\-@]?/, { token: "string", next: "@recipeBody" }],

        [/^[A-Za-z_][A-Za-z0-9_]*\s*(?:\+?=|:?=|\?=)/, "variable"],

        [/^(\.PHONY)(:)(.*)$/, [
          { token: "keyword" },
          { token: "operator" },
          { token: "type" },
        ]],

        [/^([^\s:#=][^:]*)(:)(?![=])(.*)$/, [
          { token: "type" },
          { token: "operator" },
          { token: "type" },
        ]],

        { include: "@vars" },

        [/".*?"/, "string"],
        [/'.*?'/, "string"],
      ],

      recipeBody: [
        [/^[ \t]*@?#.*$/, { token: "comment", next: "@pop" }],

        { include: "@vars" },

        [/".*?"/, "string"],
        [/'.*?'/, "string"],

        [/$/, { token: "", next: "@pop" }],

        [/[^"'$#]+/, "string"],
        [/./, "string"],
      ],

      vars: [
        [/\$\(([A-Za-z_][A-Za-z0-9_]*)\s+[^)]*\)/, "keyword"],

        [/\$\([A-Za-z_][A-Za-z0-9_]*\)/, "type"],
        [/\$\{[A-Za-z_][A-Za-z0-9_]*\}/, "type"],
      ],
    },
  });

  monaco.languages.registerCompletionItemProvider("makefile", {
    triggerCharacters: [".", "(", "$"],
    provideCompletionItems: () => ({
      suggestions: [
        kw("all"), kw("clean"), kw("distclean"), kw("install"), kw("uninstall"),
        kw("test"), kw("check"), kw("build"), kw("run"),
        kw(".PHONY"), kw(".SUFFIXES"), kw(".DEFAULT_GOAL"),
        kw("include"), kw("sinclude"), kw("define"), kw("endef"),
        kw("ifdef"), kw("ifndef"), kw("ifeq"), kw("ifneq"), kw("else"), kw("endif"),
        snip("$(shell ${1:cmd})", "shell"),
        snip("$(wildcard ${1:pattern})", "wildcard"),
        snip("$(addprefix ${1:prefix},${2:names})", "addprefix"),
        snip("$(addsuffix ${1:suffix},${2:names})", "addsuffix"),
        snip("$(subst ${1:from},${2:to},${3:text})", "subst"),
        snip("$(patsubst ${1:pattern},${2:replacement},${3:text})", "patsubst"),
        snip("$(dir ${1:files})", "dir"),
        snip("$(notdir ${1:files})", "notdir"),
        snip("$(basename ${1:files})", "basename"),
        snip("$(join ${1:list1},${2:list2})", "join"),
      ],
    }),
  });

  const hoverDocs = new Map(Object.entries({
    ".PHONY": "Declare non-file targets to avoid collisions.",
    "include": "Include another makefile (errors stop build).",
    "sinclude": "Soft-include: ignore if file missing.",
    "define": "Begin a multi-line variable; end with 'endef'.",
    "shell": "`$(shell cmd)` — run a shell and capture output.",
    "wildcard": "`$(wildcard pattern)` — expand matching files.",
  }));
  monaco.languages.registerHoverProvider("makefile", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const key = word.word;
      if (!hoverDocs.has(key)) return null;
      return {
        range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
        contents: [{ value: `**${key}**` }, { value: hoverDocs.get(key) }],
      };
    },
  });

  logit.info('LANG', "Monaco makefile language registered");
}

function kw(label) {
  return { label, kind: 14, insertText: label };
}
function snip(insertText, label) {
  return { label, kind: 27, insertText, insertTextRules: 4, detail: "Make snippet" };
}
