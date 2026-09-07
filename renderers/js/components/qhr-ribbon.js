/**
 * Qahera UI Kit — <qhr-ribbon> Web Component
 *
 * @attr {string} variant   - folded|corner|bookmark|flat (default: "folded")
 * @attr {string} placement - start|end (default: "start")
 * @attr {string} tone      - primary|neutral|dark|success|info|warning|danger|luxury
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrRibbon extends QaheraElement {
  static get observedAttributes() { return ['variant', 'placement', 'tone']; }

  _render() {
    const variant = this._prop('variant', 'folded');
    const placement = this._prop('placement', 'start');
    const tone = this._prop('tone', 'primary');

    const variantClass = (variant === 'folded' || variant === 'corner')
      ? `qhr-ribbon--${variant}-${placement}`
      : `qhr-ribbon--${variant}`;

    const classes = [
      'qhr-ribbon',
      variantClass,
      tone !== 'primary' ? `qhr-ribbon--${tone}` : ''
    ].filter(Boolean).join(' ');

    this.className = classes;
    this.setAttribute('role', 'status');
  }
}

customElements.define('qhr-ribbon', QhrRibbon);
