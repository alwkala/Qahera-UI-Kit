/**
 * Qahera UI Kit — <qhr-carousel> Web Component
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrCarousel extends QaheraElement {
  _render() {
    this.classList.add('qhr-carousel');
  }
}

customElements.define('qhr-carousel', QhrCarousel);
