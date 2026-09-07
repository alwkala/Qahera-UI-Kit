/**
 * Qahera UI Kit — Preloader Behavior Module (Alpine.js)
 * 
 * Manages simulated progress, digital percentage counter,
 * and smooth fade-out dismissal upon window load.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.11 (qhrPreloader)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrPreloader(options = {}) {
    return {
      progress: 0,
      visible: true,
      speed: options.speed || 25,
      maxWait: options.maxWait || 3500,
      intervalId: null,
      maxWaitTimeout: null,
      loadHandler: null,

      init() {
        // Increment progress smoothly up to 92%
        this.intervalId = setInterval(() => {
          if (this.progress < 92) {
            const step = Math.floor(Math.random() * 6) + 2;
            this.progress = Math.min(92, this.progress + step);
          }
        }, this.speed);

        const completeLoad = () => {
          if (!this.visible) return;
          clearInterval(this.intervalId);
          clearTimeout(this.maxWaitTimeout);

          this.progress = 100;
          setTimeout(() => {
            this.visible = false;
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('qhr-preloader-dismissed', { detail: { duration: Date.now() } }));
            }
          }, 350);
        };

        if (document.readyState === 'complete') {
          completeLoad();
        } else {
          this.loadHandler = completeLoad;
          window.addEventListener('load', this.loadHandler, { once: true });
          // Fallback maximum wait in case an asset hangs
          this.maxWaitTimeout = setTimeout(completeLoad, this.maxWait);
        }
      },

      dismissImmediately() {
        clearInterval(this.intervalId);
        clearTimeout(this.maxWaitTimeout);
        this.progress = 100;
        this.visible = false;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('qhr-preloader-dismissed'));
        }
      },

      destroy() {
        clearInterval(this.intervalId);
        clearTimeout(this.maxWaitTimeout);
        if (this.loadHandler) {
          window.removeEventListener('load', this.loadHandler);
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrPreloader = qhrPreloader;
    if (window.Alpine) {
      window.Alpine.data('qhrPreloader', qhrPreloader);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrPreloader', qhrPreloader);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrPreloader };
  }
})();
