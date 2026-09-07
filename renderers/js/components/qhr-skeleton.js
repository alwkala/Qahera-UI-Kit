import { QaheraElement } from '../qhr-core.js';

export class QhrSkeleton extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'shape']; }

  _render() {
    const variant = this._prop('variant', 'default');
    const size = this._prop('size', 'md');
    const shape = this._prop('shape', 'rectangle');

    const classes = [
      'qhr-skeleton',
      `qhr-skeleton--${variant}`,
      `qhr-skeleton--${size}`,
      shape !== 'rectangle' ? `qhr-skeleton--${shape}` : '',
    ].filter(Boolean).join(' ');

    this.innerHTML = `<div class="${classes}" aria-hidden="true"></div>`;
  }
}

customElements.define('qhr-skeleton', QhrSkeleton);
