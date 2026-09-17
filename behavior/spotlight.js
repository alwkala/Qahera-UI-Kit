/**
 * Qahera UI Kit — Spotlight Behavior Module (Micro-Physics Layer)
 * 
 * Tracks cursor coordinates across card surfaces with requestAnimationFrame throttling
 * and injects relative CSS properties (--spotlight-x, --spotlight-y) for tactile radial lighting.
 * 
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrSpotlight(options = {}) {
    return {
      ticking: false,
      active: false,
      prefersReducedMotion: false,
      mouseMoveHandler: null,
      mouseLeaveHandler: null,

      init() {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.prefersReducedMotion) return;

        const target = this.$el;
        if (!target) return;

        this.mouseMoveHandler = (e) => {
          if (!this.ticking) {
            window.requestAnimationFrame(() => {
              const rect = target.getBoundingClientRect();
              const x = Math.round(e.clientX - rect.left);
              const y = Math.round(e.clientY - rect.top);
              target.style.setProperty('--spotlight-x', `${x}px`);
              target.style.setProperty('--spotlight-y', `${y}px`);
              target.style.setProperty('--spotlight-opacity', '1');
              this.ticking = false;
            });
            this.ticking = true;
          }
        };

        this.mouseLeaveHandler = () => {
          target.style.setProperty('--spotlight-opacity', '0');
        };

        target.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
        target.addEventListener('mouseleave', this.mouseLeaveHandler, { passive: true });
      },

      destroy() {
        const target = this.$el;
        if (target && this.mouseMoveHandler) {
          target.removeEventListener('mousemove', this.mouseMoveHandler);
          target.removeEventListener('mouseleave', this.mouseLeaveHandler);
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrSpotlight = qhrSpotlight;
    if (window.Alpine) {
      window.Alpine.data('qhrSpotlight', qhrSpotlight);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrSpotlight', qhrSpotlight);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrSpotlight };
  }
})();
