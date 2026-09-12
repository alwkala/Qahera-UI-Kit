/**
 * Qahera UI Kit — <qhr-dock> Web Component
 * Bottom-anchored navigation bar for mobile viewports and handheld UX.
 *
 * @attr {string} variant - fixed|floating|rounded|pills|glass|luxury-gold (default: "fixed")
 * @attr {string} size    - sm|md|lg (default: "md")
 * @fires qhr:change
 *
 * Usage:
 *   <qhr-dock variant="floating">
 *     <a href="#home" class="qhr-dock-item is-active" aria-current="page">
 *       <div class="qhr-dock-icon-wrap">
 *         <svg class="qhr-dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
 *       </div>
 *       <span class="qhr-dock-label">الرئيسية</span>
 *     </a>
 *     <a href="#search" class="qhr-dock-item">
 *       <div class="qhr-dock-icon-wrap">
 *         <svg class="qhr-dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
 *       </div>
 *       <span class="qhr-dock-label">البحث</span>
 *     </a>
 *   </qhr-dock>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrDock extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size']; }

  connectedCallback() {
    this._initialItems = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const variant = this._prop('variant', 'fixed');
    const size    = this._prop('size', 'md');

    const variantClass = variant ? `qhr-dock--${variant}` : '';
    const sizeClass    = size && size !== 'md' ? `qhr-dock--${size}` : '';

    this.innerHTML = `
      <nav class="qhr-dock ${variantClass} ${sizeClass}".trim() aria-label="شريط التنقل السفلي" role="navigation">
        ${this._initialItems}
      </nav>
    `;
  }

  _bind() {
    const items = Array.from(this.querySelectorAll('.qhr-dock-item'));
    if (!items.length) return;

    items.forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        items.forEach((it) => {
          it.classList.remove('is-active');
          it.removeAttribute('aria-current');
        });
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');

        this._emit('change', {
          index: idx,
          label: item.querySelector('.qhr-dock-label')?.textContent?.trim() || '',
          href: item.getAttribute('href') || '#',
        });
      }, { signal: this._signal });
    });

    // Keyboard navigation (ArrowLeft / ArrowRight / Home / End)
    const nav = this.querySelector('nav.qhr-dock');
    if (!nav) return;

    nav.addEventListener('keydown', (e) => {
      const activeIdx = items.indexOf(document.activeElement);
      if (activeIdx < 0) return;

      let targetIdx = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIdx = (activeIdx + 1) % items.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIdx = (activeIdx - 1 + items.length) % items.length;
      } else if (e.key === 'Home') {
        targetIdx = 0;
      } else if (e.key === 'End') {
        targetIdx = items.length - 1;
      }

      if (targetIdx >= 0) {
        e.preventDefault();
        items[targetIdx].focus();
        items[targetIdx].click();
      }
    }, { signal: this._signal });
  }
}

customElements.define('qhr-dock', QhrDock);
