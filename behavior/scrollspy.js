/**
 * Qahera UI Kit — Scrollspy Behavior Module (Micro-Physics Layer)
 * 
 * Non-blocking IntersectionObserver scrollspy that monitors heading sections
 * and synchronizes active indicators in navigation bars and table of contents.
 * 
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrScrollspy(options = {}) {
    return {
      activeId: options.defaultId || '',
      selector: options.selector || 'section[id], [data-scrollspy-section]',
      observer: null,
      sections: [],

      init() {
        const rootMargin = options.rootMargin || '-10% 0px -75% 0px';
        const sectionNodes = document.querySelectorAll(this.selector);
        if (!sectionNodes.length) return;

        this.sections = Array.from(sectionNodes);

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeId = entry.target.id || entry.target.getAttribute('data-scrollspy-section');
            }
          });
        }, { rootMargin, threshold: 0 });

        this.sections.forEach((sec) => this.observer.observe(sec));
      },

      isActive(id) {
        return this.activeId === id;
      },

      scrollTo(id) {
        const target = document.getElementById(id);
        if (!target) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
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
    window.qhrScrollspy = qhrScrollspy;
    if (window.Alpine) {
      window.Alpine.data('qhrScrollspy', qhrScrollspy);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrScrollspy', qhrScrollspy);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrScrollspy };
  }
})();
