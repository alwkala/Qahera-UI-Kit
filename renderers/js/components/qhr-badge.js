/**
 * Qahera UI Kit — <qhr-badge> Web Component
 *
 * @attr {string} variant - primary|secondary|outline|ghost (default: "primary")
 * @attr {string} tone    - neutral|info|success|warning|danger
 * @attr {string} size    - xs|sm|md|lg|xl (default: "md")
 * @attr {boolean} dot    - Show status dot indicator
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrBadge extends QaheraElement {
  static get observedAttributes() { return ['variant', 'tone', 'size', 'dot']; }

  _render() {
    const variant = this._prop('variant', 'primary');
    const tone    = this._prop('tone');
    const size    = this._prop('size', 'md');
    const dot     = this._boolProp('dot');

    const classes = [
      'qhr-badge',
      `qhr-badge--${variant}`,
      `qhr-badge--${size}`,
      tone ? `qhr-badge--${tone}` : '',
    ].filter(Boolean).join(' ');

    const attrs = [
      `data-variant="${variant}"`,
      `data-size="${size}"`,
      tone ? `data-tone="${tone}"` : '',
    ].filter(Boolean).join(' ');

    const dotHtml = dot ? '<span class="qhr-badge-dot"></span>' : '';
    this.innerHTML = `<span class="${classes}" ${attrs}>${dotHtml}<span></span></span>`;
  }

  connectedCallback() {
    // Preserve original text content before render
    this._text = this.textContent.trim();
    super.connectedCallback();
    // Restore text into inner span
    const inner = this.querySelector('.qhr-badge > span:last-child');
    if (inner && this._text) inner.textContent = this._text;
  }
}

customElements.define('qhr-badge', QhrBadge);
