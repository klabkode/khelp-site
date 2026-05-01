// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : layout.js
// Description : Provides resizable panel behavior and outline layout controls.
// -----------------------------------------------------------------------------
import { getEditor } from "../editor/editor.js";
import { logit } from "../lib/status.js";
import {
  getOutlinePanelHidden as getOutlinePanelHiddenState,
  setOutlinePanelHidden as setOutlinePanelHiddenState
} from "./outline.js";

const STORAGE = {
  left: "ui:leftPaneWidth",
  right: "ui:rightPaneWidth",
  outlinePanelHidden: "ui:outlinePanelHidden"
};

const readVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const writeVar = (n, v) => document.documentElement.style.setProperty(n, v);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const pxToNum = px => Number(String(px).replace("px", "")) || 0;
const cssLengthToPx = (value, fallback = 0) => {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;

  if (raw.endsWith("px")) {
    const n = Number(raw.slice(0, -2));
    return Number.isFinite(n) ? n : fallback;
  }

  if (raw.endsWith("vw")) {
    const n = Number(raw.slice(0, -2));
    return Number.isFinite(n) ? (window.innerWidth * n) / 100 : fallback;
  }

  if (raw.endsWith("%")) {
    const n = Number(raw.slice(0, -1));
    return Number.isFinite(n) ? (window.innerWidth * n) / 100 : fallback;
  }

  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
};

function debounce(fn, wait = 120) {
  let t = null;
  return (...args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => { t = null; fn(...args); }, wait);
  };
}

function persistWidth(side, px) {
  localStorage.setItem(side === "left" ? STORAGE.left : STORAGE.right, String(px));
  //log.info(`Persisted ${side} pane = ${px}px`);
}
function restoreWidth(side) {
  const key = side === "left" ? STORAGE.left : STORAGE.right;
  const v = localStorage.getItem(key);
  return v ? Number(v) : null;
}

function isMobile() {
  return window.innerWidth <= 768;
}

export function getOutlinePanelHidden() {
  return getOutlinePanelHiddenState(STORAGE.outlinePanelHidden);
}

export function setOutlinePanelHidden(hidden) {
  setOutlinePanelHiddenState(hidden, {
    persist: true,
    storageKey: STORAGE.outlinePanelHidden,
    dispatchResize: false
  });
  positionGutters();
  relayoutEditorSoon();
  logit.info('LAYOUT', `Outline panel ${hidden ? "hidden" : "shown"}`);
}

export function toggleOutlinePanel() {
  const hidden = getOutlinePanelHidden();
  setOutlinePanelHidden(!hidden);
}

function positionGutters() {
  const grid = document.getElementById("app");
  const leftEl = document.getElementById("sidebar");
  const rightEl = document.getElementById("right");

  const mainEl = document.getElementById("main") || document.getElementById("viewport-main");

  const gLeft = document.querySelector(".gutter-left");
  const gRight = document.querySelector(".gutter-right");
  if (!grid || !mainEl || !gLeft) return;

  const gridRect = grid.getBoundingClientRect();
  const mainRect = mainEl.getBoundingClientRect();
  const hit = pxToNum(readVar("--gutter-hit")) || 8;

  const top = mainRect.top - gridRect.top;
  const height = mainRect.height;

  gLeft.style.top = `${top}px`;
  gLeft.style.height = `${height}px`;

  if (leftEl) {
    const leftRect = leftEl.getBoundingClientRect();
    const leftSeamX = leftRect.right - gridRect.left;
    gLeft.style.left = `calc(${leftSeamX}px - ${hit / 2}px)`;
  } else {
    gLeft.style.display = "none";
  }

  if (gRight) {
    const outlinePanelHidden = document.body.classList.contains("outline-hidden-user");
    if (outlinePanelHidden || !rightEl) {
      gRight.style.display = "none";
    } else {
      gRight.style.display = "block";
      const rightRect = rightEl.getBoundingClientRect();
      const rightSeamX = gridRect.right - rightRect.left;
      gRight.style.top = `${top}px`;
      gRight.style.height = `${height}px`;
      gRight.style.right = `calc(${rightSeamX}px - ${hit / 2}px)`;
    }
  }
}

function relayoutEditorSoon() {
  const ed = getEditor && getEditor();
  if (!ed) return;
  requestAnimationFrame(() => {
    try {
      const editorEl = document.getElementById("editor");
      const rightEl = document.getElementById("right");
      const appEl = document.getElementById("app");
      const leftVar = readVar("--left-pane");
      const rightVar = readVar("--right-pane");
      const edRect = editorEl?.getBoundingClientRect?.() || null;
      const rightRect = rightEl?.getBoundingClientRect?.() || null;
      const appRect = appEl?.getBoundingClientRect?.() || null;
      try {
        const mainEl = document.getElementById("main") || document.getElementById("viewport-main");
        const editorEl = document.getElementById("editor");
        if (mainEl && editorEl) {
          const mainRect = mainEl.getBoundingClientRect();
          editorEl.style.width = `${Math.max(0, Math.floor(mainRect.width))}px`;
          editorEl.style.height = `${Math.max(0, Math.floor(mainRect.height))}px`;
          ed.layout({ width: Math.max(0, Math.floor(mainRect.width)), height: Math.max(0, Math.floor(mainRect.height)) });
        } else {
          ed.layout();
        }
      } catch (e) { ed.layout(); }
    } catch (e) { logit.warn('LAYOUT', `Monaco layout failed: ${e?.message || e}`); }
  });

  const app = document.getElementById("app");
  if (app) {
    const ro = new ResizeObserver(() => {
      try {
        const editorEl = document.getElementById("editor");
        const rightEl = document.getElementById("right");
        const leftVar = readVar("--left-pane");
        const rightVar = readVar("--right-pane");
        const edRect = editorEl?.getBoundingClientRect?.() || null;
        const rightRect = rightEl?.getBoundingClientRect?.() || null;
        try {
          const mainEl = document.getElementById("main") || document.getElementById("viewport-main");
          const editorEl = document.getElementById("editor");
          if (mainEl && editorEl) {
            const mainRect = mainEl.getBoundingClientRect();
            editorEl.style.width = `${Math.max(0, Math.floor(mainRect.width))}px`;
            editorEl.style.height = `${Math.max(0, Math.floor(mainRect.height))}px`;
            ed.layout({ width: Math.max(0, Math.floor(mainRect.width)), height: Math.max(0, Math.floor(mainRect.height)) });
          } else {
            ed.layout();
          }
        } catch (e) { ed.layout(); }
      } catch (e) {
        logit.warn('LAYOUT', `Monaco relayout failed in ResizeObserver: ${e?.message || e}`);
      }
      ro.disconnect();
    });
    ro.observe(app);
  }
}

function setupGutter(gutterEl, side) {
  if (!gutterEl) return;
  const isLeft = side === "left";

  const minPx = () => cssLengthToPx(readVar(isLeft ? "--min-left" : "--min-right"), isLeft ? 160 : 180);
  const maxPx = () => cssLengthToPx(readVar(isLeft ? "--max-left" : "--max-right"), isLeft ? 600 : Math.floor(window.innerWidth / 2));

  let dragging = false;
  let raf = 0;

  const moveTo = (clientX) => {
    const grid = document.getElementById("app").getBoundingClientRect();
    let px = isLeft ? (clientX - grid.left) : (grid.right - clientX);
    px = clamp(px, minPx(), maxPx());
    writeVar(isLeft ? "--left-pane" : "--right-pane", `${px}px`);
    positionGutters();
    try {
      const editorEl = document.getElementById("editor");
      const rightEl = document.getElementById("right");
      const leftVar = readVar("--left-pane");
      const rightVar = readVar("--right-pane");
      const edRect = editorEl?.getBoundingClientRect?.() || null;
      const rightRect = rightEl?.getBoundingClientRect?.() || null;
    } catch (e) { }
    relayoutEditorSoon();
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    if (raf) return;
    const x = e.clientX;
    raf = requestAnimationFrame(() => { raf = 0; moveTo(x); });
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    dragging = true;
    gutterEl.classList.add("is-dragging");
    gutterEl.setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    gutterEl.classList.remove("is-dragging");
    const finalPx = pxToNum(readVar(isLeft ? "--left-pane" : "--right-pane"));
    persistWidth(side, finalPx);
    try {
      const editorEl = document.getElementById("editor");
      const rightEl = document.getElementById("right");
      const leftVar = readVar("--left-pane");
      const rightVar = readVar("--right-pane");
      const edRect = editorEl?.getBoundingClientRect?.() || null;
      const rightRect = rightEl?.getBoundingClientRect?.() || null;
    } catch (e) { }
    relayoutEditorSoon();
  };

  gutterEl.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp);

  gutterEl.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 40 : 10;
    let curr = pxToNum(readVar(isLeft ? "--left-pane" : "--right-pane"));
    if (e.key === "ArrowLeft") curr += isLeft ? -step : step;
    if (e.key === "ArrowRight") curr += isLeft ? step : -step;
    curr = clamp(curr, minPx(), maxPx());
    writeVar(isLeft ? "--left-pane" : "--right-pane", `${curr}px`);
    persistWidth(side, curr);
    positionGutters();
    relayoutEditorSoon();
  });

  gutterEl.addEventListener("dblclick", () => {
    const reset = isLeft ? 240 : 280;
    const next = clamp(reset, minPx(), maxPx());
    writeVar(isLeft ? "--left-pane" : "--right-pane", `${next}px`);
    persistWidth(side, next);
    positionGutters();
    relayoutEditorSoon();
  });
}

function applyInitialWidths() {
  if (isMobile() || document.body.classList.contains('viewport-app')) {
    logit.info('LAYOUT', "Mobile or viewport detected: skipping persisted pane widths.");
    return;
  }
  const l = restoreWidth("left");
  const r = restoreWidth("right");

  if (Number.isFinite(l)) {
    const leftMin = cssLengthToPx(readVar("--min-left"), 160);
    const leftMax = cssLengthToPx(readVar("--max-left"), 600);
    writeVar("--left-pane", `${clamp(l, leftMin, leftMax)}px`);
  }

  const outlinePanelHidden = getOutlinePanelHidden();
  if (!outlinePanelHidden && Number.isFinite(r)) {
    const rightMin = cssLengthToPx(readVar("--min-right"), 180);
    const rightMax = cssLengthToPx(readVar("--max-right"), Math.floor(window.innerWidth / 2));
    writeVar("--right-pane", `${clamp(r, rightMin, rightMax)}px`);
  } else {
    logit.info('LAYOUT', "Outline panel hidden: ignoring persisted right pane width.");
  }
}

function init() {
  try {
    const waitForStylesheets = () => {
      const allLoaded = Array.from(document.styleSheets).every(sheet => {
        try {
          return sheet.cssRules !== null;
        } catch (e) {
          return true;
        }
      });

      if (allLoaded) {
        doLayout();
      } else {
        requestAnimationFrame(waitForStylesheets);
      }
    };

    waitForStylesheets();
  } catch (err) {
    logit.error('LAYOUT', `Layout init failed: ${err?.message || err}`);
  }
}

function doLayout() {
  try {
    applyInitialWidths();
    if (!document.body.classList.contains('viewport-app')) setOutlinePanelHidden(getOutlinePanelHidden());

    positionGutters();

    setupGutter(document.querySelector(".gutter-left"), "left");
    setupGutter(document.querySelector(".gutter-right"), "right");

    const ro = new ResizeObserver(positionGutters);
    ro.observe(document.getElementById("app"));
    const onWindowResize = debounce(() => { positionGutters(); relayoutEditorSoon(); }, 120);
    window.addEventListener("resize", onWindowResize);

    const btn = document.getElementById("toggle-outline-panel");
    if (btn && !document.body.classList.contains('viewport-app')) {
      btn.addEventListener("click", () => {
        const hidden = document.body.classList.contains("outline-hidden-user");
        setOutlinePanelHidden(!hidden);
      });
    }

    requestAnimationFrame(relayoutEditorSoon);

    logit.info('LAYOUT', "Grid layout ready (resizable side panels + outline toggle).");
  } catch (err) {
    logit.error('LAYOUT', `Layout init failed: ${err?.message || err}`);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
