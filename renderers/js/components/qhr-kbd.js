import { QaheraElement } from '../qhr-core.js';

export class QhrKbd extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size']; }

  _render() {
    const variant = this._prop('variant', 'default');
    const size = this._prop('size', 'md');

    const classes = [
      'qhr-kbd',
      `qhr-kbd--${variant}`,
      `qhr-kbd--${size}`,
    ].filter(Boolean).join(' ');

    this.innerHTML = `<kbd class="${classes}"><span></span></kbd>`;
  }

  connectedCallback() {
    this._text = this.textContent.trim();
    super.connectedCallback();
    const span = this.querySelector('kbd span');
    if (span && this._text) span.textContent = this._text;
  }
}

customElements.define('qhr-kbd', QhrKbd);
