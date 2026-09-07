/**
 * Qahera UI Kit — Tabs Behavior Module (Alpine.js)
 * 
 * Keyboard arrow navigation with automatic RTL/LTR direction awareness,
 * APG Home/End support, and vertical orientation handling.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.3 (qhrTabs)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrTabs(initialTab = 0) {
    return {
      activeTab: initialTab,

      init() {
        this.bindEvents();
      },

      bindEvents() {
        const root = this.$el;
        if (!root) return;

        root.addEventListener('keydown', (e) => {
          const target = e.target;
          if (!target || target.getAttribute('role') !== 'tab') return;

          const tablist = target.closest('[role="tablist"]');
          if (!tablist) return;

          const tabs = Array.from(
            tablist.querySelectorAll('[role="tab"]:not([disabled]):not([aria-disabled="true"])')
          );
          if (tabs.length === 0) return;

          const currentIdx = tabs.indexOf(target);
          if (currentIdx === -1) return;

          const isVertical = tablist.getAttribute('aria-orientation') === 'vertical';
          const isRtl = this.isRtl();

          let nextIdx = -1;

          if (isVertical) {
            if (e.key === 'ArrowDown') nextIdx = (currentIdx + 1) % tabs.length;
            if (e.key === 'ArrowUp') nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
          } else {
            if (isRtl) {
              if (e.key === 'ArrowLeft') nextIdx = (currentIdx + 1) % tabs.length;
              if (e.key === 'ArrowRight') nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
            } else {
              if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % tabs.length;
              if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
            }
          }

          if (e.key === 'Home') nextIdx = 0;
          if (e.key === 'End') nextIdx = tabs.length - 1;

          if (nextIdx !== -1) {
            e.preventDefault();
            const targetTab = tabs[nextIdx];
            targetTab.focus();

            // Automatic tab activation (APG recommended default)
            const tabId = targetTab.getAttribute('data-tab') ?? targetTab.getAttribute('aria-controls') ?? nextIdx;
            this.setTab(tabId);
          }
        });
      },

      isRtl() {
        const dirEl = this.$el?.closest('[dir]');
        if (dirEl) return dirEl.getAttribute('dir') === 'rtl';
        if (document.documentElement.dir) return document.documentElement.dir === 'rtl';
        if (typeof window !== 'undefined' && this.$el) {
          return window.getComputedStyle(this.$el).direction === 'rtl';
        }
        return true; // Default Qahera Arabic RTL
      },

      setTab(indexOrId) {
        const prev = this.activeTab;
        this.activeTab = indexOrId;

        if (this.$dispatch) {
          this.$dispatch('qhr-tab-change', {
            activeTab: indexOrId,
            previousTab: prev
          });
        }
      },

      isActive(indexOrId) {
        return String(this.activeTab) === String(indexOrId);
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrTabs = qhrTabs;
    if (window.Alpine) {
      window.Alpine.data('qhrTabs', qhrTabs);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrTabs', qhrTabs);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrTabs };
  }
})();
