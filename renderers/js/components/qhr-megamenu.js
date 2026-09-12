/**
 * Qahera UI Kit — <qhr-megamenu> Web Component
 * Expansive multi-column navigation surface with trigger and click-outside dismissal.
 *
 * @attr {string} variant - 2-cols|3-cols|4-cols|with-featured|full-width|glass (default: "3-cols")
 * @attr {string} size    - md|lg|xl (default: "md")
 * @attr {boolean} open   - Whether megamenu panel is visible
 * @fires qhr:open
 * @fires qhr:close
 *
 * Usage:
 *   <qhr-megamenu variant="3-cols">
 *     <button slot="trigger" class="qhr-btn qhr-btn--ghost qhr-btn--sm">المنتجات</button>
 *     <div class="qhr-megamenu-grid">
 *       <!-- Category columns and lists -->
 *     </div>
 *   </qhr-megamenu>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrMegamenu extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'open']; }

  connectedCallback() {
    this._triggerSlot = this.querySelector('[slot="trigger"]')?.outerHTML || '';
    
    // Grab all remaining HTML (excluding slot="trigger")
    const clone = this.cloneNode(true);
    const trig = clone.querySelector('[slot="trigger"]');
    if (trig) trig.remove();
    this._panelContent = clone.innerHTML;

    super.connectedCallback();
  }

  _render() {
    const variant = this._prop('variant', '3-cols');
    const size    = this._prop('size', 'md');
    const isOpen  = this.hasAttribute('open');

    const variantClass = variant ? `qhr-megamenu--${variant}` : '';
    const sizeClass    = size && size !== 'md' ? `qhr-megamenu--${size}` : '';
    const openClass    = isOpen ? 'is-open' : '';

    let html = '<div class="qhr-megamenu-wrapper">';

    if (this._triggerSlot) {
      html += this._triggerSlot;
    }

    html += `
      <nav class="qhr-megamenu ${variantClass} ${sizeClass} ${openClass}".trim() 
           role="region" 
           aria-label="القائمة الموسعة" 
           aria-expanded="${isOpen}">
        ${this._panelContent}
      </nav>
    `;

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const trigger = this.querySelector('[slot="trigger"]') || this.querySelector('.qhr-megamenu-wrapper > button');
    const panel   = this.querySelector('.qhr-megamenu');

    if (trigger) {
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', String(this.hasAttribute('open')));

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      }, { signal: this._signal });
    }

    // Click outside dismissal
    document.addEventListener('click', (e) => {
      if (this.hasAttribute('open') && !this.contains(e.target)) {
        this.close();
      }
    }, { signal: this._signal });

    // Escape key dismissal
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.hasAttribute('open')) {
        e.preventDefault();
        this.close();
        trigger?.focus();
      }
    }, { signal: this._signal });
  }

  open() {
    this.setAttribute('open', '');
    this._render();
    this._bind();
    this._emit('open');
  }

  close() {
    this.removeAttribute('open');
    this._render();
    this._bind();
    this._emit('close');
  }

  toggle() {
    if (this.hasAttribute('open')) {
      this.close();
    } else {
      this.open();
    }
  }
}

customElements.define('qhr-megamenu', QhrMegamenu);
