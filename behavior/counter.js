/**
 * Qahera UI Kit — Numerical Counter Behavior Module (Micro-Physics Layer)
 * 
 * Animates numeric metrics and counters upon viewport intersection
 * with smooth cubic-bezier ease-out physics and localized numeral formatting.
 * 
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrCounter(options = {}) {
    return {
      current: 0,
      target: options.target || 0,
      duration: options.duration || 1800,
      prefix: options.prefix || '',
      suffix: options.suffix || '',
      locale: options.locale || 'ar-EG',
      started: false,
      observer: null,

      init() {
        // Read dataset if target not passed in options
        if (!this.target && this.$el && this.$el.dataset.counterTarget) {
          this.target = parseFloat(this.$el.dataset.counterTarget) || 0;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          this.current = this.target;
          return;
        }

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.started) {
              this.started = true;
              this.animate();
              if (this.observer) this.observer.disconnect();
            }
          });
        }, { threshold: 0.2 });

        this.observer.observe(this.$el);
      },

      animate() {
        const startTime = performance.now();
        const duration = this.duration;
        const targetVal = this.target;

        const step = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          this.current = Math.floor(eased * targetVal);

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            this.current = targetVal;
          }
        };

        window.requestAnimationFrame(step);
      },

      get displayValue() {
        return this.prefix + this.current.toLocaleString(this.locale) + this.suffix;
      },

      destroy() {
        if (this.observer) {
          this.observer.disconnect();
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrCounter = qhrCounter;
    if (window.Alpine) {
      window.Alpine.data('qhrCounter', qhrCounter);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrCounter', qhrCounter);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrCounter };
  }
})();
