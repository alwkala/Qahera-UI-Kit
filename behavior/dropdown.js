/**
 * Qahera UI Kit — Dropdown Behavior Module (Alpine.js)
 * 
 * APG-compliant accessible dropdown menu with keyboard navigation and focus management.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.1 (qhrDropdown)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrDropdown(options = {}) {
    return {
      open: false,
      activeIndex: -1,
      items: [],

      init() {
        this.bindEvents();
      },

      bindEvents() {
        const root = this.$el;
        if (!root) return;

        // APG Keyboard Navigation on the root container
        root.addEventListener('keydown', (e) => {
          if (!this.open) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
              if (document.activeElement === this.getTriggerElement()) {
                e.preventDefault();
                this.show();
                if (e.key === 'ArrowUp') {
                  this.lastItem();
                }
              }
            }
            return;
          }

          switch (e.key) {
            case 'Escape':
              e.preventDefault();
              e.stopPropagation();
              this.close();
              break;

            case 'ArrowDown':
              e.preventDefault();
              this.nextItem();
              break;

            case 'ArrowUp':
              e.preventDefault();
              this.prevItem();
              break;

            case 'Home':
              e.preventDefault();
              this.firstItem();
              break;

            case 'End':
              e.preventDefault();
              this.lastItem();
              break;

            case 'Tab':
              this.close();
              break;
          }
        });
      },

      getTriggerElement() {
        return this.$refs?.trigger || this.$el.querySelector('button, [aria-haspopup="true"]');
      },

      getMenuItems() {
        const menu = this.$refs?.menu || this.$el.querySelector('.qhr-dropdown-menu, [role="menu"]');
        if (!menu) return [];
        return Array.from(
          menu.querySelectorAll('[role="menuitem"]:not([disabled]):not(.disabled), .qhr-dropdown-item:not([disabled]):not(.is-disabled), button:not([disabled]):not(.disabled), a:not([disabled])')
        );
      },

      toggle() {
        this.open ? this.close() : this.show();
      },

      show() {
        this.open = true;
        this.$nextTick(() => {
          this.items = this.getMenuItems();
          if (this.items.length > 0) {
            this.activeIndex = 0;
            this.items[0]?.focus();
          }
          if (this.$dispatch) {
            this.$dispatch('qhr-dropdown-open');
          }
        });
      },

      close() {
        if (!this.open) return;
        this.open = false;
        this.activeIndex = -1;
        const trigger = this.getTriggerElement();
        if (trigger && typeof trigger.focus === 'function') {
          trigger.focus();
        }
        if (this.$dispatch) {
          this.$dispatch('qhr-dropdown-close');
        }
      },

      nextItem() {
        this.items = this.getMenuItems();
        if (this.items.length === 0) return;
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
        this.items[this.activeIndex]?.focus();
      },

      prevItem() {
        this.items = this.getMenuItems();
        if (this.items.length === 0) return;
        this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
        this.items[this.activeIndex]?.focus();
      },

      firstItem() {
        this.items = this.getMenuItems();
        if (this.items.length === 0) return;
        this.activeIndex = 0;
        this.items[0]?.focus();
      },

      lastItem() {
        this.items = this.getMenuItems();
        if (this.items.length === 0) return;
        this.activeIndex = this.items.length - 1;
        this.items[this.activeIndex]?.focus();
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrDropdown = qhrDropdown;
    if (window.Alpine) {
      window.Alpine.data('qhrDropdown', qhrDropdown);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrDropdown', qhrDropdown);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrDropdown };
  }
})();
