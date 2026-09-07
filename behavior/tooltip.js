/**
 * Qahera UI Kit — Tooltip Behavior Module (Alpine.js)
 * 
 * Accessible tooltip with hover/focus triggers, customizable delays,
 * screen-safe bounds checking, and Escape key dismissal.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.5 (qhrTooltip)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrTooltip(config = 200) {
    const showDelay = typeof config === 'number' ? config : (config.showDelay ?? 200);
    const hideDelay = typeof config === 'object' ? (config.hideDelay ?? 100) : 100;

    return {
      visible: false,
      timer: null,

      init() {
        this.bindEvents();
      },

      bindEvents() {
        const root = this.$el;
        if (!root) return;

        // APG: Escape key dismisses active tooltip
        root.addEventListener('keydown', (e) => {
          if (this.visible && e.key === 'Escape') {
            e.stopPropagation();
            this.hideImmediately();
          }
        });
      },

      show() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.visible = true;
          this.$nextTick(() => {
            this.adjustBounds();
          });
        }, showDelay);
      },

      hide() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.visible = false;
        }, hideDelay);
      },

      hideImmediately() {
        clearTimeout(this.timer);
        this.visible = false;
      },

      adjustBounds() {
        const tooltipEl = this.$refs?.tooltip || this.$el.querySelector('.qhr-tooltip, [role="tooltip"]');
        if (!tooltipEl) return;

        const rect = tooltipEl.getBoundingClientRect();
        const padding = 8; // Screen margin safety

        // Check horizontal screen overflow
        if (rect.right > window.innerWidth - padding) {
          const overflow = rect.right - (window.innerWidth - padding);
          tooltipEl.style.transform = `translateX(-${overflow}px)`;
        } else if (rect.left < padding) {
          const underflow = padding - rect.left;
          tooltipEl.style.transform = `translateX(${underflow}px)`;
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrTooltip = qhrTooltip;
    if (window.Alpine) {
      window.Alpine.data('qhrTooltip', qhrTooltip);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrTooltip', qhrTooltip);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrTooltip };
  }
})();
