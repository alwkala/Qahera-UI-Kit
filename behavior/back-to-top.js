/**
 * Qahera UI Kit — BackToTop Behavior Module (Alpine.js)
 * 
 * Monitors window scroll offset with RAF throttling and smoothly animates to top,
 * respecting user reduced-motion preferences.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.9 (qhrBackToTop)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrBackToTop(options = {}) {
    return {
      visible: false,
      threshold: options.threshold || 400,
      ticking: false,
      scrollHandler: null,

      init() {
        this.scrollHandler = () => {
          if (!this.ticking) {
            window.requestAnimationFrame(() => {
              this.visible = window.scrollY > this.threshold;
              this.ticking = false;
            });
            this.ticking = true;
          }
        };

        window.addEventListener('scroll', this.scrollHandler, { passive: true });
        // Initial check
        this.visible = window.scrollY > this.threshold;
      },

      scrollToTop() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(0, { duration: prefersReducedMotion ? 0 : 1.2 });
        } else {
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      },

      destroy() {
        if (this.scrollHandler) {
          window.removeEventListener('scroll', this.scrollHandler);
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrBackToTop = qhrBackToTop;
    if (window.Alpine) {
      window.Alpine.data('qhrBackToTop', qhrBackToTop);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrBackToTop', qhrBackToTop);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrBackToTop };
  }
})();
