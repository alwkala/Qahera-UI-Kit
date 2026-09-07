/**
 * Qahera UI Kit — Accordion Behavior Module (Alpine.js)
 * 
 * Accessible disclosure panels with single or multiple expand modes & APG keyboard navigation.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.4 (qhrAccordion)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrAccordion(config = {}) {
    // Resilient parameter parsing: accepts boolean, array of IDs, or config object
    const isMultiple = typeof config === 'boolean'
      ? config
      : Boolean(config && (config.multiple || config.allowMultiple));

    let initialOpen = [];
    if (Array.isArray(config)) {
      initialOpen = config.map(String);
    } else if (config && config.defaultOpen !== undefined) {
      initialOpen = Array.isArray(config.defaultOpen)
        ? config.defaultOpen.map(String)
        : [String(config.defaultOpen)];
    }

    return {
      allowMultiple: isMultiple,
      activeItems: initialOpen,

      init() {
        this.$nextTick(() => {
          this.bindKeyboardNavigation();
        });
      },

      bindKeyboardNavigation() {
        const root = this.$el;
        if (!root) return;

        root.addEventListener('keydown', (e) => {
          const triggers = Array.from(
            root.querySelectorAll('.qhr-accordion-trigger:not(:disabled):not([aria-disabled="true"]), .qhr-accordion-header button:not(:disabled)')
          );

          if (triggers.length === 0) return;
          const currentIdx = triggers.indexOf(document.activeElement);

          if (currentIdx === -1) return;

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              triggers[(currentIdx + 1) % triggers.length]?.focus();
              break;

            case 'ArrowUp':
              e.preventDefault();
              triggers[(currentIdx - 1 + triggers.length) % triggers.length]?.focus();
              break;

            case 'Home':
              e.preventDefault();
              triggers[0]?.focus();
              break;

            case 'End':
              e.preventDefault();
              triggers[triggers.length - 1]?.focus();
              break;
          }
        });
      },

      isOpen(id) {
        return this.activeItems.includes(String(id));
      },

      toggle(id) {
        const strId = String(id);
        const willOpen = !this.isOpen(strId);

        if (willOpen) {
          if (this.allowMultiple) {
            this.activeItems.push(strId);
          } else {
            this.activeItems = [strId];
          }
        } else {
          this.activeItems = this.activeItems.filter(item => item !== strId);
        }

        this.notifyChange(strId, willOpen);
      },

      open(id) {
        const strId = String(id);
        if (!this.isOpen(strId)) {
          if (this.allowMultiple) {
            this.activeItems.push(strId);
          } else {
            this.activeItems = [strId];
          }
          this.notifyChange(strId, true);
        }
      },

      close(id) {
        const strId = String(id);
        if (this.isOpen(strId)) {
          this.activeItems = this.activeItems.filter(item => item !== strId);
          this.notifyChange(strId, false);
        }
      },

      openAll(allIds = []) {
        if (!this.allowMultiple || !Array.isArray(allIds)) return;
        this.activeItems = allIds.map(String);
        this.notifyChange('all', true);
      },

      closeAll() {
        this.activeItems = [];
        this.notifyChange('all', false);
      },

      notifyChange(id, isOpen) {
        if (this.$dispatch) {
          this.$dispatch('qhr-accordion-change', {
            id,
            isOpen,
            activeItems: [...this.activeItems]
          });
        }
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrAccordion = qhrAccordion;
    if (window.Alpine) {
      window.Alpine.data('qhrAccordion', qhrAccordion);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrAccordion', qhrAccordion);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrAccordion };
  }
})();
