/**
 * Qahera UI Kit — Toast Notification Manager (Alpine.js)
 * 
 * Global event bus, stacking queue, canonical tone mapping,
 * and auto-dismiss timeout with interactive pause-on-hover.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.6 (qhrToast)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  // Strict controlled vocabulary mapping
  function normalizeTone(tone) {
    if (tone === 'error') return 'danger';
    const validTones = ['neutral', 'info', 'success', 'warning', 'danger'];
    return validTones.includes(tone) ? tone : 'info';
  }

  function qhrToast(options = {}) {
    const maxToasts = options.maxToasts || 5;

    return {
      toasts: [],
      timers: {},

      init() {
        // Global event bus listener
        window.addEventListener('qhr-toast-show', (e) => {
          if (e.detail) {
            this.add(e.detail);
          }
        });
      },

      add({ title = '', message = '', tone = 'info', duration = 4500, action = null }) {
        const id = 'toast-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        const normalizedTone = normalizeTone(tone);

        const toast = {
          id,
          title,
          message,
          tone: normalizedTone,
          duration,
          action,
          remaining: duration,
          startTime: Date.now()
        };

        // Enforce maximum visible toasts in queue
        if (this.toasts.length >= maxToasts) {
          const oldest = this.toasts[0];
          this.remove(oldest.id);
        }

        this.toasts.push(toast);

        if (duration > 0) {
          this.startTimer(toast);
        }

        if (this.$dispatch) {
          this.$dispatch('qhr-toast-added', { id, toast });
        }

        return id;
      },

      startTimer(toast) {
        this.timers[toast.id] = setTimeout(() => {
          this.remove(toast.id);
        }, toast.remaining);
      },

      pause(id) {
        const toast = this.toasts.find(t => t.id === id);
        if (!toast || toast.duration <= 0) return;

        if (this.timers[id]) {
          clearTimeout(this.timers[id]);
          delete this.timers[id];
        }

        const elapsed = Date.now() - toast.startTime;
        toast.remaining = Math.max(500, toast.remaining - elapsed);
      },

      resume(id) {
        const toast = this.toasts.find(t => t.id === id);
        if (!toast || toast.duration <= 0) return;

        toast.startTime = Date.now();
        this.startTimer(toast);
      },

      remove(id) {
        if (this.timers[id]) {
          clearTimeout(this.timers[id]);
          delete this.timers[id];
        }
        this.toasts = this.toasts.filter(t => t.id !== id);

        if (this.$dispatch) {
          this.$dispatch('qhr-toast-removed', { id });
        }
      },

      clearAll() {
        Object.keys(this.timers).forEach(id => clearTimeout(this.timers[id]));
        this.timers = {};
        this.toasts = [];
      }
    };
  }

  // Convenient programmatic global launcher
  function qhrToastShow(payload) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('qhr-toast-show', { detail: payload }));
    }
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrToast = qhrToast;
    window.qhrToastShow = qhrToastShow;

    if (window.Alpine) {
      window.Alpine.data('qhrToast', qhrToast);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrToast', qhrToast);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrToast, qhrToastShow };
  }
})();
