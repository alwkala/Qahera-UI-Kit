/**
 * Qahera UI Kit — <qhr-pagination> Web Component
 *
 * @attr {number} current - Current active page number
 * @attr {number} total - Total number of pages
 * @attr {number} page-size - Elements per page
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrPagination extends QaheraElement {
  static get observedAttributes() { return ['current', 'total', 'page-size']; }

  _render() {
    this.classList.add('qhr-pagination');
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'pagination');
  }
}

customElements.define('qhr-pagination', QhrPagination);
