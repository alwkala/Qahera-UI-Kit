/**
 * Qahera UI Kit — Canvas Sparks Physics Engine (Alpine.js)
 * 
 * Renders atmospheric rising gold sparks/embers on dark surfaces
 * with RAF cycle, Retina scaling, and auto-pause on theme switch.
 * 
 * @spec 04-BEHAVIOR-SPEC §2.10 (qhrCanvasSparks)
 * @author Alwkala Studio / Qahera UI Kit
 */

(function () {
  'use strict';

  function qhrCanvasSparks(options = {}) {
    return {
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      dpr: 1,
      sparks: [],
      sparkCount: options.count || 35,
      animationFrameId: null,
      isPaused: false,
      themeObserver: null,
      resizeHandler: null,
      visibilityHandler: null,

      init() {
        this.canvas = this.$refs?.canvas || this.$el.querySelector('canvas') || (this.$el.tagName === 'CANVAS' ? this.$el : null);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) return;

        this.dpr = window.devicePixelRatio || 1;
        this.resize();

        this.resizeHandler = () => this.resize();
        window.addEventListener('resize', this.resizeHandler);

        // Page visibility listener (pause on hidden tab to save battery)
        this.visibilityHandler = () => {
          if (document.hidden) {
            this.pause();
          } else {
            this.checkThemeAndResume();
          }
        };
        document.addEventListener('visibilitychange', this.visibilityHandler);

        // Theme switch observer (auto-pause on light theme)
        this.themeObserver = new MutationObserver(() => {
          this.checkThemeAndResume();
        });
        this.themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme', 'class']
        });

        // Initialize sparks
        this.initSparks();

        // Initial theme check & start
        this.checkThemeAndResume();
      },

      isDarkTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark' || theme === 'midnight' || theme === 'obsidian') return true;
        if (theme === 'light') return false;
        return document.documentElement.classList.contains('dark');
      },

      checkThemeAndResume() {
        if (this.isDarkTheme()) {
          this.resume();
        } else {
          this.pause();
          // Clear canvas when on light theme
          if (this.ctx && this.width && this.height) {
            this.ctx.clearRect(0, 0, this.width, this.height);
          }
        }
      },

      resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement || this.canvas;
        const rect = parent.getBoundingClientRect();
        this.width = rect.width || window.innerWidth;
        this.height = rect.height || 400;

        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        if (this.ctx) {
          this.ctx.scale(this.dpr, this.dpr);
        }
      },

      initSparks() {
        this.sparks = [];
        for (let i = 0; i < this.sparkCount; i++) {
          this.sparks.push(this.createSpark(true));
        }
      },

      createSpark(randomY = false) {
        return {
          x: Math.random() * this.width,
          y: randomY ? Math.random() * this.height : this.height + 10,
          size: Math.random() * 1.8 + 0.6,
          speedY: Math.random() * 0.8 + 0.3,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.2,
          fadeSpeed: Math.random() * 0.003 + 0.002
        };
      },

      resume() {
        if (!this.isPaused && this.animationFrameId) return;
        this.isPaused = false;
        this.loop();
      },

      pause() {
        this.isPaused = true;
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      },

      loop() {
        if (this.isPaused) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.sparks.length; i++) {
          const s = this.sparks[i];
          s.y -= s.speedY;
          s.x += s.speedX;
          s.opacity -= s.fadeSpeed;

          if (s.opacity <= 0 || s.y < -10) {
            this.sparks[i] = this.createSpark(false);
          } else {
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(212, 175, 55, ${s.opacity})`;
            this.ctx.shadowBlur = 6;
            this.ctx.shadowColor = 'rgba(242, 201, 76, 0.6)';
            this.ctx.fill();
          }
        }

        this.animationFrameId = requestAnimationFrame(() => this.loop());
      },

      destroy() {
        this.pause();
        if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
        if (this.visibilityHandler) document.removeEventListener('visibilitychange', this.visibilityHandler);
        if (this.themeObserver) this.themeObserver.disconnect();
      }
    };
  }

  // Universal registration (Alpine.data + window global)
  if (typeof window !== 'undefined') {
    window.qhrCanvasSparks = qhrCanvasSparks;
    if (window.Alpine) {
      window.Alpine.data('qhrCanvasSparks', qhrCanvasSparks);
    } else {
      document.addEventListener('alpine:init', () => {
        window.Alpine.data('qhrCanvasSparks', qhrCanvasSparks);
      });
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { qhrCanvasSparks };
  }
})();
