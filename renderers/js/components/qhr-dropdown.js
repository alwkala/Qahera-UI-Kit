/**
 * Qahera UI Kit — <qhr-dropdown> Web Component
 * Accessible dropdown menu with trigger button.
 *
 * @attr {string} label    - Trigger button text
 * @attr {string} variant  - Trigger button variant (default: "secondary")
 * @attr {string} size     - Trigger button size (default: "md")
 * @attr {string} align    - Menu alignment: start|end (default: "start")
 * @fires qhr:open
 * @fires qhr:close
 * @fires qhr:select
 *
 * Usage:
 *   <qhr-dropdown label="خيارات">
 *     <a href="#" class="qhr-dropdown-item">الملف التعريفي</a>
 *     <div class="qhr-dropdown-separator"></div>
 *     <button class="qhr-dropdown-item qhr-dropdown-item--destructive">حذف</button>
 *   </qhr-dropdown>
 */
import { QaheraElement, QHR_ICON_PATHS } from '../qhr-core.js';

export class QhrDropdown extends QaheraElement {
  static get observedAttributes() { return ['label', 'variant', 'size', 'align']; }

  constructor() {
    super();
    this._open = false;
  }

  connectedCallback() {
    this._menuItems = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const label   = this._prop('label', '');
    const variant = this._prop('variant', 'secondary');
    const size    = this._prop('size', 'md');
    const align   = this._prop('align', 'start');

    let html = '<div class="qhr-dropdown">';

    // Trigger
    html += `<button type="button" class="qhr-btn qhr-btn--${variant} qhr-btn--${size}" aria-haspopup="true" aria-expanded="${this._open}">`;
    html += `<span>${label}</span>`;
    html += `<svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['chevron-down']}"/></svg>`;
    html += '</button>';

    // Menu
    html += `<div class="qhr-dropdown-menu qhr-dropdown-menu--${align}" role="menu" style="${this._open ? '' : 'display:none;'}">`;
    html += this._menuItems || '';
    html += '</div>';

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const trigger = this.querySelector('[aria-haspopup]');
    const menu    = this.querySelector('.qhr-dropdown-menu');
    if (!trigger || !menu) return;

    // Toggle
    trigger.addEventListener('click', () => {
      this._open = !this._open;
      this._render();
      this._bind();
      this._emit(this._open ? 'open' : 'close');
    }, { signal: this._signal });

    // Click outside
    document.addEventListener('click', (e) => {
      if (this._open && !this.contains(e.target)) {
        this._open = false;
        this._render();
        this._bind();
        this._emit('close');
      }
    }, { signal: this._signal });

    // Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._open) {
        this._open = false;
        this._render();
        this._bind();
        this._emit('close');
      }
    }, { signal: this._signal });

    // Item clicks
    menu.querySelectorAll('.qhr-dropdown-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        this._emit('select', { text: item.textContent.trim(), element: item });
        this._open = false;
        this._render();
        this._bind();
      }, { signal: this._signal });
    });
  }
}

customElements.define('qhr-dropdown', QhrDropdown);
