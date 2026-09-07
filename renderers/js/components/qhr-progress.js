/**
 * Qahera UI Kit — <qhr-progress> Web Component
 *
 * @attr {number} value          - Current value (0..100)
 * @attr {string} size           - xxs|xs|sm|md|lg|xl (default: "md")
 * @attr {string} tone           - primary|neutral|success|warning|danger|info|secondary|purple|luxury
 * @attr {boolean} striped       - Diagonal striped pattern
 * @attr {boolean} animated      - Moving stripes animation
 * @attr {boolean} indeterminate - Continuous streaming pulse wave
 * @attr {boolean} vertical      - Vertical bottom-to-top orientation
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrProgress extends QaheraElement {
  static get observedAttributes() {
    return ['value', 'size', 'tone', 'striped', 'animated', 'indeterminate', 'vertical'];
  }

  _render() {
    const indeterminate = this._boolProp('indeterminate');
    const vertical = this._boolProp('vertical');
    const value = indeterminate ? 0 : Math.max(0, Math.min(100, parseFloat(this._prop('value', '0')) || 0));
    const size = this._prop('size', 'md');
    const tone = this._prop('tone', 'primary');
    const striped = this._boolProp('striped');
    const animated = this._boolProp('animated');

    const classes = [
      'qhr-progress',
      `qhr-progress--${size}`,
      vertical ? 'qhr-progress--vertical' : '',
      tone !== 'primary' ? `qhr-progress--${tone}` : '',
      striped ? 'qhr-progress--striped' : '',
      animated ? 'qhr-progress--animated' : '',
      indeterminate ? 'qhr-progress--indeterminate' : ''
    ].filter(Boolean).join(' ');

    const barStyle = indeterminate
      ? ''
      : vertical
      ? `style="height: ${value}%;"`
      : `style="width: ${value}%;"`;

    const ariaNow = indeterminate ? '' : `aria-valuenow="${value}"`;

    this.innerHTML = `
      <div class="${classes}" role="progressbar" ${ariaNow} aria-valuemin="0" aria-valuemax="100">
        <div class="qhr-progress-bar" ${barStyle}></div>
      </div>
    `;
  }
}

customElements.define('qhr-progress', QhrProgress);
