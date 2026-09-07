/**
 * Qahera UI Kit — <qhr-spinner> Web Component
 *
 * @attr {string} size - xs|sm|md|lg|xl (default: "md")
 * @attr {string} tone - primary|success|warning|danger|info
 * @attr {string} label- Screen reader announcement
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrSpinner extends QaheraElement {
  static get observedAttributes() { return ['size', 'tone', 'label']; }

  _render() {
    const size = this._prop('size', 'md');
    const tone = this._prop('tone', 'primary');
    const label = this._prop('label', 'جاري التحميل...');

    const classes = [
      'qhr-spinner',
      `qhr-spinner--${size}`,
      `qhr-spinner--${tone}`
    ].filter(Boolean).join(' ');

    this.innerHTML = `
      <span class="${classes}" role="status" aria-label="${label}">
        <span style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">
          ${label}
        </span>
      </span>
    `;
  }
}

customElements.define('qhr-spinner', QhrSpinner);
