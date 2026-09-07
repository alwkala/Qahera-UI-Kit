/**
 * Qahera UI Kit — Custom Select Behavior Module (Alpine.js)
 * 
 * Accessible single-choice custom select with APG keyboard navigation,
 * typeahead filtering, and focus management.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.7 (qhrSelect)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrSelect(initialValue = '') {
    return {
      open: false,
      value: initialValue,
      label: '',
      activeIndex: -1,
      searchBuffer: '',
      searchTimeout: null,

      init() {
        this.$nextTick(() => {
          this.syncLabel();
          this.bindEvents();
        });
      },

      syncLabel() {
        const options = this.getOptions();
        const selected = options.find(opt => opt.getAttribute('data-value') === String(this.value));
        if (selected) {
          this.label = selected.textContent.trim();
        }
      },

      getOptions() {
        const listbox = this.$refs?.options || this.$el.querySelector('.qhr-select-options, [role="listbox"]');
        if (!listbox) return [];
        return Array.from(
          listbox.querySelectorAll('[role="option"]:not([disabled]):not(.disabled), [data-value]:not([disabled]):not(.disabled)')
        );
      },

      bindEvents() {
        const root = this.$el;
        if (!root) return;

        root.addEventListener('keydown', (e) => {
          const options = this.getOptions();
          if (options.length === 0) return;

          if (!this.open) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggle();
            }
            return;
          }

          switch (e.key) {
            case 'Escape':
              e.preventDefault();
              this.close();
              this.$refs?.button?.focus();
              break;

            case 'ArrowDown':
              e.preventDefault();
              this.activeIndex = (this.activeIndex + 1) % options.length;
              options[this.activeIndex]?.focus();
              break;

            case 'ArrowUp':
              e.preventDefault();
              this.activeIndex = (this.activeIndex - 1 + options.length) % options.length;
              options[this.activeIndex]?.focus();
              break;

            case 'Home':
              e.preventDefault();
              this.activeIndex = 0;
              options[0]?.focus();
              break;

            case 'End':
              e.preventDefault();
              this.activeIndex = options.length - 1;
              options[options.length - 1]?.focus();
              break;

            case 'Enter':
            case ' ':
              e.preventDefault();
              if (this.activeIndex >= 0 && options[this.activeIndex]) {
                const opt = options[this.activeIndex];
                this.select(opt.getAttribute('data-value'), opt.textContent.trim());
              }
              break;

            default:
              // Typeahead key search (1 char or sequential)
              if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                this.handleTypeahead(e.key, options);
              }
              break;
          }
        });
      },

      handleTypeahead(char, options) {
        clearTimeout(this.searchTimeout);
        this.searchBuffer += char.toLowerCase();
        this.searchTimeout = setTimeout(() => {
          this.searchBuffer = '';
        }, 600);

        const matchIdx = options.findIndex(opt =>
          opt.textContent.trim().toLowerCase().startsWith(this.searchBuffer)
        );

        if (matchIdx !== -1) {
          this.activeIndex = matchIdx;
          options[matchIdx]?.focus();
        }
      },

      toggle() {
        this.open = !this.open;
        if (this.open) {
          this.$nextTick(() => {
            const options = this.getOptions();
            const currentSelectedIdx = options.findIndex(opt => opt.getAttribute('data-value') === String(this.value));
            this.activeIndex = currentSelectedIdx >= 0 ? currentSelectedIdx : 0;
            options[this.activeIndex]?.focus();
          });
        }
      },

      select(val, text) {
        this.value = val;
        this.label = text;
        this.open = false;

        const btn = this.$refs?.button || this.$el.querySelector('button, [role="combobox"]');
        if (btn && typeof btn.focus === 'function') {
          btn.focus();
        }

        if (this.$dispatch) {
          this.$dispatch('change', { value: val, label: text });
          this.$dispatch('qhr-select-change', { value: val, label: text });
        }
      },

      close() {
        this.open = false;
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrSelect = qhrSelect;
    if (window.Alpine) {
      window.Alpine.data('qhrSelect', qhrSelect);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrSelect', qhrSelect);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrSelect };
  }
})();
