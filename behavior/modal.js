/**
 * Qahera UI Kit — Modal Dialog Behavior Module (Alpine.js)
 * 
 * Accessible dialog overlay with focus trap, body scroll-lock, Escape dismissal,
 * and automatic focus restoration.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.2 (qhrModal)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrModal(options = {}) {
    return {
      open: Boolean(options.defaultOpen),
      triggerElement: null,
      previousBodyOverflow: '',

      init() {
        this.bindEvents();
      },

      bindEvents() {
        const root = this.$el;
        if (!root) return;

        // Global Escape listener when modal is open
        window.addEventListener('keydown', (e) => {
          if (this.open && e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            this.hide();
          }
        });

        // Focus trap inside the modal dialog
        root.addEventListener('keydown', (e) => {
          if (this.open && e.key === 'Tab') {
            this.handleTab(e);
          }
        });
      },

      show() {
        if (this.open) return;
        this.triggerElement = document.activeElement;
        this.open = true;

        // Prevent body background scroll while open
        this.previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        this.$nextTick(() => {
          const focusable = this.getFocusableElements();
          if (focusable.length > 0) {
            // Focus element with autofocus, or the first focusable element
            const autoFocusEl = focusable.find(el => el.hasAttribute('autofocus'));
            (autoFocusEl || focusable[0]).focus();
          }

          if (this.$dispatch) {
            this.$dispatch('qhr-modal-open');
          }
        });
      },

      hide() {
        if (!this.open) return;
        this.open = false;

        // Restore body scroll
        document.body.style.overflow = this.previousBodyOverflow || '';

        // Restore focus to the trigger element
        if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
          this.$nextTick(() => {
            this.triggerElement.focus();
          });
        }

        if (this.$dispatch) {
          this.$dispatch('qhr-modal-close');
        }
      },

      toggle() {
        this.open ? this.hide() : this.show();
      },

      close() {
        this.hide();
      },

      openModal() {
        this.show();
      },

      closeModal() {
        this.hide();
      },

      getFocusableElements() {
        const dialog = this.$refs?.dialog || this.$el.querySelector('.qhr-modal, .qhr-modal-dialog, [role="dialog"]') || this.$el;
        const selector = [
          'button:not([disabled])',
          '[href]',
          'input:not([disabled]):not([type="hidden"])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
          '[contenteditable="true"]'
        ].join(', ');

        return Array.from(dialog.querySelectorAll(selector)).filter(el => {
          return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
        });
      },

      handleTab(e) {
        const focusable = this.getFocusableElements();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrModal = qhrModal;
    if (window.Alpine) {
      window.Alpine.data('qhrModal', qhrModal);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrModal', qhrModal);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrModal };
  }
})();
