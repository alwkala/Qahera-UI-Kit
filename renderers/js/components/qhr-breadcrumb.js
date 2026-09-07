/**
 * Qahera UI Kit — <qhr-breadcrumb> Web Component
 *
 * @attr {string} separator - Separator symbol (default: "/")
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrBreadcrumb extends QaheraElement {
  static get observedAttributes() { return ['separator']; }

  _render() {
    this.classList.add('qhr-breadcrumb');
    this.setAttribute('aria-label', 'breadcrumb');
  }
}

customElements.define('qhr-breadcrumb', QhrBreadcrumb);
