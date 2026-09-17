/**
 * Qahera UI Kit — <qhr-cartouche> Web Component
 *
 * Egyptian royal cartouche framing motif with tactile border and knot-base.
 *
 * @attr {string} variant - outline|elevated|solid (default: "elevated")
 * @attr {string} size    - sm|md|lg (default: "md")
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrCartouche extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size']; }

  _render() {
    const variant = this._prop('variant', 'elevated');
    const size = this._prop('size', 'md');

    this.className = `qhr-cartouche qhr-cartouche--${variant} qhr-cartouche--${size}`;
    this.setAttribute('role', 'region');
  }
}

customElements.define('qhr-cartouche', QhrCartouche);
