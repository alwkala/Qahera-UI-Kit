/**
 * Qahera UI Kit — <qhr-stepper> Web Component
 *
 * @attr {number} active - Active step index
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrStepper extends QaheraElement {
  static get observedAttributes() { return ['active']; }

  _render() {
    this.classList.add('qhr-stepper');
    this.setAttribute('aria-label', 'steps');
  }
}

customElements.define('qhr-stepper', QhrStepper);
