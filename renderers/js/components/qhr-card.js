/**
 * Qahera UI Kit — <qhr-card> Web Component
 * Composite card with header, body, and footer slots.
 *
 * @attr {string} variant - default|elevated|outlined (default: "default")
 * @attr {string} title
 * @attr {string} description
 *
 * Usage:
 *   <qhr-card title="عنوان" description="وصف مختصر">
 *     <div slot="body">المحتوى الرئيسي</div>
 *     <div slot="footer">أزرار الإجراءات</div>
 *   </qhr-card>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrCard extends QaheraElement {
  static get observedAttributes() { return ['variant', 'title', 'description']; }

  connectedCallback() {
    this._bodySlot   = this.querySelector('[slot="body"]')?.innerHTML || '';
    this._footerSlot = this.querySelector('[slot="footer"]')?.innerHTML || '';
    this._headerSlot = this.querySelector('[slot="header"]')?.innerHTML || '';
    // If no slots, capture all innerHTML as body
    if (!this._bodySlot && !this._footerSlot && !this._headerSlot) {
      this._bodySlot = this.innerHTML;
    }
    super.connectedCallback();
  }

  _render() {
    const variant     = this._prop('variant', 'default');
    const title       = this._prop('title');
    const description = this._prop('description');

    let html = `<div class="qhr-card" data-variant="${variant}">`;

    // Header
    if (title || this._headerSlot) {
      html += '<div class="qhr-card-header">';
      if (title) {
        html += '<div>';
        html += `<h3 class="qhr-card-title">${title}</h3>`;
        if (description) html += `<p class="qhr-card-description">${description}</p>`;
        html += '</div>';
      }
      if (this._headerSlot) html += this._headerSlot;
      html += '</div>';
    }

    // Body
    if (this._bodySlot) {
      html += `<div class="qhr-card-body">${this._bodySlot}</div>`;
    }

    // Footer
    if (this._footerSlot) {
      html += `<div class="qhr-card-footer">${this._footerSlot}</div>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }
}

customElements.define('qhr-card', QhrCard);
