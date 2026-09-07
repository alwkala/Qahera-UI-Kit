/**
 * Qahera UI Kit — <qhr-timeline> Web Component
 *
 * @attr {boolean} horizontal - Display horizontally
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrTimeline extends QaheraElement {
  static get observedAttributes() { return ['horizontal']; }

  _render() {
    const horizontal = this._boolProp('horizontal');
    this.classList.add('qhr-timeline');
    if (horizontal) {
      this.classList.add('qhr-timeline--horizontal');
    }
  }
}

customElements.define('qhr-timeline', QhrTimeline);
