/**
 * Qahera UI Kit — <qhr-seal> Web Component
 * Official accreditation mark, institutional certification, and royal stamp emblem.
 *
 * @attr {string} variant - solid|subtle|outline (default: "solid")
 * @attr {string} size    - sm|md|lg (default: "md")
 * @attr {string} label   - Primary seal text (default: "معتمد")
 * @attr {string} subtext - Subordinate accreditation label (default: "ALWKALA")
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrSeal extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'label', 'subtext']; }

  connectedCallback() {
    this._slotContent = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const variant = this._prop('variant', 'solid');
    const size    = this._prop('size', 'md');
    const label   = this._prop('label', 'معتمد');
    const subtext = this._prop('subtext', 'ALWKALA');

    this.className = `qhr-seal qhr-seal--${variant} qhr-seal--${size}`;
    this.setAttribute('role', 'status');

    const emblemSvg = '<div class="qhr-seal__emblem"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a6 6 0 100 12 6 6 0 000-12zm-8 14h16M6 18v2m12-2v2"/></svg></div>';
    const subtextHtml = subtext ? `<span class="qhr-seal__subtext">${subtext}</span>` : '';

    this.innerHTML = `<div class="qhr-seal__ring">${emblemSvg}<span class="qhr-seal__label">${label}</span>${subtextHtml}${this._slotContent || ''}</div>`;
  }
}

customElements.define('qhr-seal', QhrSeal);
