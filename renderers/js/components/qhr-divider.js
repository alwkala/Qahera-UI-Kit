import { QaheraElement } from '../qhr-core.js';

export class QhrDivider extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'orientation']; }

  _render() {
    const variant = this._prop('variant', 'default');
    const size = this._prop('size', 'md');
    const orientation = this._prop('orientation', 'horizontal');

    const classes = [
      'qhr-divider',
      `qhr-divider--${variant}`,
      `qhr-divider--${size}`,
      orientation === 'vertical' ? 'qhr-divider--vertical' : '',
    ].filter(Boolean).join(' ');

    this.innerHTML = `<div class="${classes}" role="separator" aria-orientation="${orientation}"><span class="qhr-divider-label"></span></div>`;
  }

  connectedCallback() {
    this._text = this.textContent.trim();
    super.connectedCallback();
    const label = this.querySelector('.qhr-divider-label');
    if (label && this._text) {
      label.textContent = this._text;
    } else if (label) {
      label.remove();
    }
  }
}

customElements.define('qhr-divider', QhrDivider);
