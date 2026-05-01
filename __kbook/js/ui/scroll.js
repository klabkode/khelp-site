// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : scroll.js
// Description : Provides virtual scrolling utilities for large file trees.
// -----------------------------------------------------------------------------

import { logit } from "../lib/status.js";

/**
 * VirtualScroller: Manages virtual scrolling of large lists
 *
 */
export class VirtualScroller {
  constructor(container, itemHeight = 24, renderFn = null) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.renderFn = renderFn;
    this.items = [];
    this.visibleStart = 0;
    this.visibleEnd = 0;
    this.isRendering = false;
    this.rafId = null;

    this.handleScroll = this.handleScroll.bind(this);

    this.container.addEventListener('scroll', this.handleScroll, { passive: true });

    logit.debug('SCROLL', `VirtualScroll: Initialized with item height ${itemHeight}px`);
  }

  /**
   * Set items to render
   */
  setItems(items, renderFn = null) {
    this.items = items;
    if (renderFn) this.renderFn = renderFn;

    logit.debug('SCROLL', `VirtualScroll: Set ${items.length} items`);
    this.render();
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.onScroll());
  }

  /**
   * Called when scroll event fires
   */
  onScroll() {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;

    this.visibleStart = Math.floor(scrollTop / this.itemHeight);
    this.visibleEnd = Math.ceil((scrollTop + containerHeight) / this.itemHeight);

    const buffer = Math.ceil(containerHeight / this.itemHeight / 2);
    this.visibleStart = Math.max(0, this.visibleStart - buffer);
    this.visibleEnd = Math.min(this.items.length, this.visibleEnd + buffer);

    this.render();
  }

  /**
   * Render visible items
   */
  render() {
    if (this.isRendering) return;
    this.isRendering = true;

    try {
      const fragment = document.createDocumentFragment();

      const paddingTop = this.visibleStart * this.itemHeight;
      if (paddingTop > 0) {
        const spacer = document.createElement('div');
        spacer.style.height = paddingTop + 'px';
        spacer.setAttribute('data-virtual-spacer', 'top');
        fragment.appendChild(spacer);
      }

      for (let i = this.visibleStart; i < this.visibleEnd; i++) {
        const item = this.items[i];
        if (!item) continue;

        if (this.renderFn) {
          const el = this.renderFn(item, i);
          if (el) fragment.appendChild(el);
        } else {
          const li = document.createElement('li');
          li.textContent = item.name || String(item);
          li.style.height = this.itemHeight + 'px';
          fragment.appendChild(li);
        }
      }

      const paddingBottom = (this.items.length - this.visibleEnd) * this.itemHeight;
      if (paddingBottom > 0) {
        const spacer = document.createElement('div');
        spacer.style.height = paddingBottom + 'px';
        spacer.setAttribute('data-virtual-spacer', 'bottom');
        fragment.appendChild(spacer);
      }

      this.container.innerHTML = '';
      this.container.appendChild(fragment);

    } finally {
      this.isRendering = false;
    }
  }

  /**
   * Scroll to item index
   */
  scrollToItem(index) {
    const scrollTop = index * this.itemHeight;
    this.container.scrollTop = scrollTop;
  }

  /**
   * Get item at scroll position
   */
  getVisibleRange() {
    return {
      start: this.visibleStart,
      end: this.visibleEnd,
      count: this.visibleEnd - this.visibleStart
    };
  }

  /**
   * Cleanup
   */
  destroy() {
    this.container.removeEventListener('scroll', this.handleScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.items = [];
  }
}

/**
 * Check if virtual scrolling should be used
 * @param {number} itemCount - Number of items
 * @returns {boolean} true if virtual scrolling recommended
 */
export function shouldUseVirtualScroll(itemCount) {
  return itemCount > 5000;
}

/**
 * Create a virtual tree scroller configured for file trees
 */
export function createTreeScroller(container) {
  const scroller = new VirtualScroller(container, 24, (item, index) => {
    const li = document.createElement('li');
    li.className = 'tree-item';
    li.setAttribute('data-path', item.path || '');
    li.setAttribute('data-index', index);

    const depth = (item.path?.match(/\//g) || []).length;
    const indent = depth * 16;

    const content = document.createElement('div');
    content.className = 'tree-item-content';
    content.style.paddingLeft = indent + 'px';

    const icon = document.createElement('span');
    icon.className = `tree-icon ${item.isDir ? 'is-dir' : 'is-file'}`;

    const name = document.createElement('span');
    name.className = 'tree-name';
    name.textContent = item.name || '';

    content.appendChild(icon);
    content.appendChild(name);
    li.appendChild(content);

    li.style.height = '24px';

    return li;
  });

  logit.debug('SCROLL', "VirtualScroll: Created tree scroller");
  return scroller;
}
