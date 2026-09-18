/**
 * Qahera UI Kit — Sovereign Motion & Choreography Engine (v1.0.0)
 * Zero Mandatory Build Step • Native IntersectionObserver + RAF
 * Optional seamless bridge to GSAP & Lenis
 * 
 * Features:
 * 1. 3D Perspective Card Tilt with Specular Glare (data-qhr-tilt)
 * 2. Fluid Telemetry Numerical Counters (data-qhr-counter)
 * 3. Staggered Scroll-Triggered Reveals (data-qhr-reveal)
 * 4. Multi-Depth Parallax Drift (data-qhr-parallax)
 * 5. Full RTL Parity & prefers-reduced-motion safety
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.QaheraMotion = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const isReducedMotion = () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const isRTL = () => {
    return document.documentElement.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';
  };

  const QaheraMotion = {
    initialized: false,

    init(options = {}) {
      if (this.initialized) return;
      this.initialized = true;

      if (isReducedMotion()) {
        console.log('[Qahera Motion] prefers-reduced-motion is active. Kinetic animations bypassed.');
        this.revealImmediately();
        return;
      }

      this.initReveals();
      this.initTilt();
      this.initCounters();
      this.initParallax();

      // Optional Lenis integration if present
      if (typeof window.Lenis !== 'undefined' && options.smoothScroll !== false) {
        this.initLenis();
      }
    },

    /**
     * 1. Staggered Scroll Reveals (data-qhr-reveal)
     */
    initReveals() {
      const elements = document.querySelectorAll('[data-qhr-reveal]');
      if (!elements.length) return;

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        elements.forEach(el => observer.observe(el));
      } else {
        elements.forEach(el => el.classList.add('is-revealed'));
      }
    },

    revealImmediately() {
      document.querySelectorAll('[data-qhr-reveal]').forEach(el => el.classList.add('is-revealed'));
    },

    /**
     * 2. 3D Card Tilt with Specular Glare (data-qhr-tilt)
     */
    initTilt() {
      const cards = document.querySelectorAll('[data-qhr-tilt]');
      if (!cards.length) return;

      cards.forEach(card => {
        let ticking = false;

        const onMouseMove = (e) => {
          if (ticking) return;
          ticking = true;

          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            const maxTilt = parseFloat(card.getAttribute('data-qhr-tilt-max')) || 8;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;

            const tiltY = (isRTL() ? -dx : dx) * maxTilt;
            const tiltX = -dy * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

            ticking = false;
          });
        };

        const onMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };

        card.addEventListener('mousemove', onMouseMove, { passive: true });
        card.addEventListener('mouseleave', onMouseLeave, { passive: true });
      });
    },

    /**
     * 3. Fluid Numerical Counters (data-qhr-counter)
     */
    initCounters() {
      const counters = document.querySelectorAll('[data-qhr-counter]');
      if (!counters.length) return;

      const runCounter = (el) => {
        const rawTarget = el.getAttribute('data-qhr-counter');
        const duration = (parseFloat(el.getAttribute('data-qhr-duration')) || 1.8) * 1000;
        
        // Convert Eastern Arabic numerals to Western for calculation if needed
        const normalizeNum = (str) => {
          return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
        };
        const toEasternArabic = (num) => {
          return String(num).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
        };

        const isArabicInput = /[٠-٩]/.test(rawTarget);
        const targetVal = parseFloat(normalizeNum(rawTarget)) || 0;
        const startTime = performance.now();

        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic curve
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(targetVal * easeOut);

          el.textContent = isArabicInput ? toEasternArabic(currentVal) : currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = rawTarget;
          }
        };

        requestAnimationFrame(updateCount);
      };

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        counters.forEach(el => observer.observe(el));
      } else {
        counters.forEach(el => runCounter(el));
      }
    },

    /**
     * 4. Multi-Depth Parallax Drift (data-qhr-parallax)
     */
    initParallax() {
      const parallaxEls = document.querySelectorAll('[data-qhr-parallax]');
      if (!parallaxEls.length) return;

      let ticking = false;

      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;

          parallaxEls.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-qhr-parallax')) || 0.15;
            const rect = el.getBoundingClientRect();
            // Parallax offset relative to viewport
            const offset = (scrollY - (el.offsetTop || 0)) * speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          });

          ticking = false;
        });
      }, { passive: true });
    },

    /**
     * 5. Optional Lenis Integration Hook
     */
    initLenis() {
      try {
        const lenis = new window.Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        console.log('[Qahera Motion] Lenis smooth scroll coordinated.');
      } catch (err) {
        // Fallback silently if Lenis configuration differs
      }
    }
  };

  // Auto-bootstrap when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => QaheraMotion.init());
    } else {
      QaheraMotion.init();
    }
  }

  return QaheraMotion;
}));
