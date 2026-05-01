// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : keymap.js
// Description : Provides global and editor keybinding registration utilities.
// -----------------------------------------------------------------------------

const KEYMAP_GROUPS = Object.freeze({
  GLOBAL_PLUS_EDITOR: "global-plus-editor",
  EDITOR_ONLY: "editor-only"
});

let configuredEditorShellHandlers = null;
const registeredEditorGroups = new WeakMap();

const WINDOW_SHORTCUTS = Object.freeze([
  { id: "save-active-tab", action: "saveActiveTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: true, alt: false, shift: false, key: "s" },
  { id: "grep-outline", action: "openGrepOutline", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "g" },
  { id: "grep-file", action: "openGrepFile", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: true, key: "g" },
  { id: "reopen-last-closed-tab", action: "reopenLastClosedTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "o" },
  { id: "switch-next-tab", action: "switchToNextTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "`" },
  { id: "close-active-tab", action: "closeActiveTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "w" },
  { id: "toggle-outline-panel", action: "toggleOutlinePanel", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "p" },
  { id: "show-file-tags", action: "activateOutlineTagsTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "t" },
  { id: "toggle-preview", action: "togglePreview", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "v" },
  { id: "toggle-minimap", action: "toggleMinimap", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "m" },
  { id: "toggle-word-wrap", action: "toggleWordWrap", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "c" },
  { id: "open-in-new-tab", action: "openInNewTab", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "n" },
  { id: "navigate-back-left", action: "goBack", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "ArrowLeft" },
  { id: "navigate-back-down", action: "goBack", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "ArrowDown" },
  { id: "navigate-forward-right", action: "goForward", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "ArrowRight" },
  { id: "navigate-forward-up", action: "goForward", group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR, ctrl: false, alt: true, shift: false, key: "ArrowUp" },
  {
    id: "switch-tab-index",
    action: "switchToTabByIndex",
    group: KEYMAP_GROUPS.GLOBAL_PLUS_EDITOR,
    ctrl: false,
    alt: true,
    shift: false,
    keyPattern: /^[1-9]$/,
    argsFromEvent: (event) => [parseInt(event.key, 10) - 1]
  }
]);

const EDITOR_SHELL_ACTIONS = Object.freeze([
  {
    id: "kbook-save-active-tab",
    label: "Download File",
    action: "saveActiveTab",
    keybindings: [
      { ctrl: true, keyCode: "KeyS" }
    ]
  },
  {
    id: "kbook-grep-outline",
    label: "Grep Search (Outline)",
    action: "openGrepOutline",
    keybindings: [
      { alt: true, keyCode: "KeyG" }
    ]
  },
  {
    id: "kbook-grep-file",
    label: "Grep Search (File)",
    action: "openGrepFile",
    keybindings: [
      { alt: true, shift: true, keyCode: "KeyG" }
    ]
  },
  {
    id: "kbook-reopen-last-closed-tab",
    label: "Reopen Last Closed Tab",
    action: "reopenLastClosedTab",
    keybindings: [
      { alt: true, keyCode: "KeyO" }
    ]
  },
  {
    id: "kbook-switch-tab",
    label: "Switch Tab",
    action: "switchToNextTab",
    keybindings: [
      { alt: true, keyCode: "Backquote" }
    ]
  },
  {
    id: "kbook-close-tab",
    label: "Close Tab",
    action: "closeActiveTab",
    keybindings: [
      { alt: true, keyCode: "KeyW" }
    ]
  },
  {
    id: "kbook-toggle-outline-panel",
    label: "Toggle Outline Panel",
    action: "toggleOutlinePanel",
    keybindings: [
      { alt: true, keyCode: "KeyP" }
    ]
  },
  {
    id: "kbook-show-file-tags",
    label: "Switch to File Tags",
    action: "activateOutlineTagsTab",
    keybindings: [
      { alt: true, keyCode: "KeyT" }
    ]
  },
  {
    id: "kbook-toggle-preview",
    label: "Toggle Preview",
    action: "togglePreview",
    keybindings: [
      { alt: true, keyCode: "KeyV" }
    ]
  },
  {
    id: "kbook-toggle-minimap",
    label: "Toggle Minimap",
    action: "toggleMinimap",
    keybindings: [
      { alt: true, keyCode: "KeyM" }
    ]
  },
  {
    id: "kbook-toggle-word-wrap",
    label: "Toggle Word Wrap",
    action: "toggleWordWrap",
    keybindings: [
      { alt: true, keyCode: "KeyC" }
    ]
  },
  {
    id: "kbook-open-in-new-tab",
    label: "Open in New Tab",
    action: "openInNewTab",
    keybindings: [
      { alt: true, keyCode: "KeyN" }
    ]
  },
  {
    id: "kbook-go-back",
    label: "Navigate Back",
    action: "goBack",
    keybindings: [
      { alt: true, keyCode: "LeftArrow" },
      { alt: true, keyCode: "DownArrow" }
    ]
  },
  {
    id: "kbook-go-forward",
    label: "Navigate Forward",
    action: "goForward",
    keybindings: [
      { alt: true, keyCode: "RightArrow" },
      { alt: true, keyCode: "UpArrow" }
    ]
  }
]);

function buildIndexedEditorShellActions() {
  return Array.from({ length: 9 }, (_, index) => ({
    id: `kbook-switch-tab-${index + 1}`,
    label: `Switch to Tab ${index + 1}`,
    action: "switchToTabByIndex",
    args: [index],
    keybindings: [
      { alt: true, keyCode: `Digit${index + 1}` }
    ]
  }));
}

function getRegisteredGroups(editor) {
  let groups = registeredEditorGroups.get(editor);
  if (!groups) {
    groups = new Set();
    registeredEditorGroups.set(editor, groups);
  }
  return groups;
}

function isEditorGroupRegistered(editor, group) {
  return getRegisteredGroups(editor).has(group);
}

function markEditorGroupRegistered(editor, group) {
  getRegisteredGroups(editor).add(group);
}

function matchesWindowShortcut(event, shortcut) {
  const ctrl = !!(event.ctrlKey || event.metaKey);
  const alt = !!event.altKey;
  const shift = !!event.shiftKey;

  if (ctrl !== !!shortcut.ctrl) return false;
  if (alt !== !!shortcut.alt) return false;
  if (shift !== !!shortcut.shift) return false;

  if (shortcut.keyPattern) {
    return shortcut.keyPattern.test(event.key);
  }

  return String(event.key || "").toLowerCase() === String(shortcut.key || "").toLowerCase();
}

function invokeWindowHandler(shortcut, handlers, event) {
  const handler = handlers?.[shortcut.action];
  if (typeof handler !== "function") return false;
  const args = shortcut.argsFromEvent ? shortcut.argsFromEvent(event) : [];
  handler(...args);
  return true;
}

function toMonacoKeybinding(monaco, keybinding) {
  let binding = 0;
  if (keybinding.ctrl) binding |= monaco.KeyMod.CtrlCmd;
  if (keybinding.alt) binding |= monaco.KeyMod.Alt;
  if (keybinding.shift) binding |= monaco.KeyMod.Shift;

  const keyCode = monaco.KeyCode[keybinding.keyCode];
  if (typeof keyCode !== "number") {
    throw new Error(`Unsupported Monaco key code: ${keybinding.keyCode}`);
  }

  return binding | keyCode;
}

function registerEditorActions(editor, monaco, actions, handlers, group) {
  if (!editor || !monaco || !handlers) return;
  if (isEditorGroupRegistered(editor, group)) return;

  for (const action of actions) {
    const handler = handlers[action.action];
    if (typeof handler !== "function") continue;

    editor.addAction({
      id: action.id,
      label: action.label,
      keybindings: action.keybindings.map((binding) => toMonacoKeybinding(monaco, binding)),
      contextMenuGroupId: action.contextMenuGroupId,
      contextMenuOrder: action.contextMenuOrder,
      precondition: action.precondition,
      run: () => handler(...(action.args || []))
    });
  }

  markEditorGroupRegistered(editor, group);
}

export function setEditorShellKeymapHandlers(handlers) {
  configuredEditorShellHandlers = handlers || null;
}

export function registerWindowKeymaps({ target = window, handlers }) {
  if (!target || !handlers) return () => { };

  const dispatchShortcut = (eventLike) => {
    for (const shortcut of WINDOW_SHORTCUTS) {
      if (!matchesWindowShortcut(eventLike, shortcut)) continue;
      if (!invokeWindowHandler(shortcut, handlers, eventLike)) continue;
      return true;
    }
    return false;
  };

  const listener = (event) => {
    if (event.defaultPrevented) return;
    if (dispatchShortcut(event)) {
      event.preventDefault();
    }
  };

  const messageListener = (event) => {
    const data = event?.data;
    if (!data || typeof data !== "object") return;
    if (data.type !== "kbook-keydown") return;

    const synthetic = {
      key: String(data.key || ""),
      ctrlKey: !!(data.ctrlKey || data.metaKey),
      altKey: !!data.altKey,
      shiftKey: !!data.shiftKey,
      metaKey: !!data.metaKey,
      defaultPrevented: false
    };

    if (dispatchShortcut(synthetic)) {
      try {
        event.source?.postMessage({ type: "kbook-keydown-handled", key: synthetic.key }, "*");
      } catch { }
    }
  };

  target.addEventListener("keydown", listener);
  target.addEventListener("message", messageListener);
  return () => {
    target.removeEventListener("keydown", listener);
    target.removeEventListener("message", messageListener);
  };
}

export function registerEditorShellKeymaps({ editor, monaco, handlers = configuredEditorShellHandlers } = {}) {
  if (!handlers) return;
  registerEditorActions(editor, monaco, [...EDITOR_SHELL_ACTIONS, ...buildIndexedEditorShellActions()], handlers, "global-plus-editor");
}

export { KEYMAP_GROUPS };
