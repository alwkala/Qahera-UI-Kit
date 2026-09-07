/**
 * Qahera UI Kit — Navbar Responsive & Submenu Behavior Module (Alpine.js)
 * 
 * Mobile responsive menu drawer toggle, dropdown submenus, escape key dismiss,
 * backdrop lock, and automatic desktop resize restoration.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.8 (qhrNavbar)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrNavbar(options = {}) {
    const desktopBreakpoint = options.breakpoint || 1024;

    return {
      mobileOpen: false,
      activeDropdown: null,
      previousBodyOverflow: '',

      init() {
        this.bindEvents();
      },

      bindEvents() {
        // Auto-close on resize to desktop viewport
        window.addEventListener('resize', () => {
          if (this.mobileOpen && window.innerWidth >= desktopBreakpoint) {
            this.close();
          }
        });

        // Global Escape listener to dismiss submenus and mobile drawer
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            if (this.activeDropdown) {
              e.preventDefault();
              this.closeDropdown();
            } else if (this.mobileOpen) {
              e.preventDefault();
              this.close();
            }
          }
        });

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
          if (this.activeDropdown && !e.target.closest('.qhr-navbar-dropdown')) {
            this.closeDropdown();
          }
        });
      },

      toggle() {
        this.mobileOpen ? this.close() : this.open();
      },

      open() {
        if (this.mobileOpen) return;
        this.mobileOpen = true;

        this.previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        if (this.$dispatch) {
          this.$dispatch('qhr-navbar-toggle', { open: true });
        }
      },

      close() {
        if (!this.mobileOpen) return;
        this.mobileOpen = false;

        document.body.style.overflow = this.previousBodyOverflow || '';

        const trigger = this.$refs?.trigger || this.$el.querySelector('.qhr-navbar-toggle, [aria-expanded]');
        if (trigger && typeof trigger.focus === 'function') {
          trigger.focus();
        }

        if (this.$dispatch) {
          this.$dispatch('qhr-navbar-toggle', { open: false });
        }
      },

      toggleDropdown(id) {
        this.activeDropdown = this.activeDropdown === id ? null : id;
      },

      closeDropdown() {
        this.activeDropdown = null;
      },

      isDropdownOpen(id) {
        return this.activeDropdown === id;
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrNavbar = qhrNavbar;
    if (window.Alpine) {
      window.Alpine.data('qhrNavbar', qhrNavbar);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrNavbar', qhrNavbar);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrNavbar };
  }
})();
