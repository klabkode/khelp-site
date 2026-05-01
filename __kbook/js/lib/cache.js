// -----------------------------------------------------------------------------
// Copyright (c) 2026 Kirubakaran
// SPDX-License-Identifier: MIT
// File        : cache.js
// Description : Provides an IndexedDB cache layer for tree and symbol data.
// -----------------------------------------------------------------------------

/**
 * Enables instant app startup on repeat visits by caching tree/symbols data
 * Uses IndexedDB for persistent storage across browser sessions
 */

import { logit } from "./status.js";

const DB_NAME = 'kbook-cache';
const DB_VERSION = 1;
const TREE_STORE = 'tree-data';
const SYMBOLS_STORE = 'symbols-data';
const METADATA_STORE = 'metadata';

let __db = null;

/**
 * Initialize IndexedDB
 */
async function initDB() {
  if (__db) return __db;

  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onerror = () => {
      logit.warn('CACHE', "Cache: IndexedDB open failed");
      reject(new Error('IndexedDB open failed'));
    };

    req.onsuccess = (e) => {
      __db = e.target.result;
      logit.debug('CACHE', "Cache: IndexedDB initialized");
      resolve(__db);
    };

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(TREE_STORE)) {
        db.createObjectStore(TREE_STORE);
        logit.debug('CACHE', "Cache: Created tree-data store");
      }

      if (!db.objectStoreNames.contains(SYMBOLS_STORE)) {
        db.createObjectStore(SYMBOLS_STORE);
        logit.debug('CACHE', "Cache: Created symbols-data store");
      }

      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE);
        logit.debug('CACHE', "Cache: Created metadata store");
      }
    };
  });
}

/**
 * Get cached tree data
 * @returns {Promise<Object|null>} Cached tree or null if not found
 */
export async function getCachedTree() {
  try {
    const db = await initDB();

    return new Promise((resolve) => {
      const tx = db.transaction(TREE_STORE, 'readonly');
      const store = tx.objectStore(TREE_STORE);
      const req = store.get('tree');

      req.onsuccess = () => {
        const data = req.result;
        if (data) {
          logit.debug('CACHE', `Cache: Retrieved tree (${data.items?.length || 0} items)`);
        }
        resolve(data || null);
      };

      req.onerror = () => resolve(null);
    });
  } catch (e) {
    logit.warn('CACHE', `Cache: Error getting tree: ${e?.message}`);
    return null;
  }
}

/**
 * Clear tree cache
 * @returns {Promise<void>}
 */
export async function clearCachedTree() {
  try {
    const db = await initDB();

    return new Promise((resolve) => {
      const tx = db.transaction(TREE_STORE, 'readwrite');
      const store = tx.objectStore(TREE_STORE);
      const req = store.delete('tree');

      req.onsuccess = () => {
        logit.debug('CACHE', "Cache: Cleared tree cache");
        resolve();
      };

      req.onerror = () => resolve();
    });
  } catch (e) {
    logit.warn('CACHE', `Cache: Error clearing tree: ${e?.message}`);
  }
}

/**
 * Clear symbols cache for a file
 * @param {string} filePath - Path to file (or null to clear all)
 * @returns {Promise<void>}
 */
export async function clearCachedSymbols(filePath = null) {
  try {
    const db = await initDB();

    return new Promise((resolve) => {
      const tx = db.transaction(SYMBOLS_STORE, 'readwrite');
      const store = tx.objectStore(SYMBOLS_STORE);

      if (filePath) {
        const req = store.delete(filePath);
        req.onsuccess = () => {
          logit.debug('CACHE', `Cache: Cleared symbols for ${filePath}`);
          resolve();
        };
      } else {
        const req = store.clear();
        req.onsuccess = () => {
          logit.debug('CACHE', "Cache: Cleared all symbols");
          resolve();
        };
      }
    });
  } catch (e) {
    logit.warn('CACHE', `Cache: Error clearing symbols: ${e?.message}`);
  }
}

/**
 * Clear all caches
 * @returns {Promise<void>}
 */
export async function clearAllCaches() {
  try {
    logit.info('CACHE', "Cache: Clearing all caches...");
    await clearCachedTree();
    await clearCachedSymbols();

    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction(METADATA_STORE, 'readwrite');
      const store = tx.objectStore(METADATA_STORE);
      const req = store.clear();

      req.onsuccess = () => {
        logit.info('CACHE', "Cache: All caches cleared");
        resolve();
      };

      req.onerror = () => resolve();
    });
  } catch (e) {
    logit.warn('CACHE', `Cache: Error clearing all: ${e?.message}`);
  }
}

/**
 * Check if tree cache is valid
 * @param {number} maxAge - Max age in milliseconds (default: 1 hour)
 * @returns {Promise<boolean>}
 */
export async function isCacheValid(maxAge = 3600000) {
  try {
    const tree = await getCachedTree();
    if (!tree?.cachedAt) return false;

    const age = Date.now() - tree.cachedAt;
    const valid = age < maxAge;

    if (valid) {
      logit.debug('CACHE', `Cache: Tree cache valid (age: ${(age / 1000).toFixed(1)}s)`);
    } else {
      logit.debug('CACHE', `Cache: Tree cache expired (age: ${(age / 1000).toFixed(1)}s)`);
    }

    return valid;
  } catch (e) {
    return false;
  }
}
