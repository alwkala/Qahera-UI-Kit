/**
 * Qahera UI Kit — <qhr-navbar> Web Component
 * Responsive navigation bar with brand, links, and actions slots.
 *
 * @attr {string} brand     - Brand text
 * @attr {string} brand-href - Brand link URL
 *
 * Usage:
 *   <qhr-navbar brand="قاهرة" brand-href="/">
 *     <nav slot="links">
 *       <a href="#" class="qhr-nav-link is-active">الرئيسية</a>
 *       <a href="#" class="qhr-nav-link">المكونات</a>
 *     </nav>
 *     <div slot="actions">
 *       <qhr-btn variant="primary" size="sm">تسجيل</qhr-btn>
 *     </div>
 *   </qhr-navbar>
 */
import { QaheraElement, QHR_ICON_PATHS } from '../qhr-core.js';

export class QhrNavbar extends QaheraElement {
  static get observedAttributes() { return ['brand', 'brand-href']; }

  connectedCallback() {
    this._linksSlot   = this.querySelector('[slot="links"]')?.innerHTML || '';
    this._actionsSlot = this.querySelector('[slot="actions"]')?.innerHTML || '';
    super.connectedCallback();
  }

  _render() {
    const brand     = this._prop('brand', '');
    const brandHref = this._prop('brand-href', '/');

    let html = '<nav class="qhr-navbar" role="navigation" aria-label="التنقل الرئيسي">';
    html += '<div class="qhr-navbar-container">';

    // Brand
    html += `<a href="${brandHref}" class="qhr-navbar-brand">${brand}</a>`;

    // Mobile toggle
    html += `<button type="button" class="qhr-navbar-toggle" aria-label="فتح القائمة" aria-expanded="false"><svg class="qhr-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['menu']}"/></svg></button>`;

    // Collapsible section
    html += '<div class="qhr-navbar-collapse">';

    // Links
    if (this._linksSlot) {
      html += `<div class="qhr-navbar-links">${this._linksSlot}</div>`;
    }

    // Actions
    if (this._actionsSlot) {
      html += `<div class="qhr-navbar-actions">${this._actionsSlot}</div>`;
    }

    html += '</div>'; // collapse
    html += '</div>'; // container
    html += '</nav>';

    this.innerHTML = html;
  }

  _bind() {
    const toggle = this.querySelector('.qhr-navbar-toggle');
    const collapse = this.querySelector('.qhr-navbar-collapse');
    if (!toggle || !collapse) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      collapse.classList.toggle('is-open', !expanded);
    }, { signal: this._signal });
  }
}

customElements.define('qhr-navbar', QhrNavbar);
