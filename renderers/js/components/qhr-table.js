/**
 * Qahera UI Kit — <qhr-table> Web Component
 * Data table wrapper with striped and bordered options.
 *
 * @attr {boolean} striped  - Enable alternating row colors
 * @attr {boolean} bordered - Enable cell borders
 * @attr {boolean} compact  - Reduce cell padding
 *
 * Usage: Children should be a standard <table> element.
 *   <qhr-table striped>
 *     <table>
 *       <thead><tr><th>العمود</th></tr></thead>
 *       <tbody><tr><td>البيانات</td></tr></tbody>
 *     </table>
 *   </qhr-table>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrTable extends QaheraElement {
  static get observedAttributes() { return ['striped', 'bordered', 'compact']; }

  connectedCallback() {
    this._tableHTML = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const striped  = this._boolProp('striped');
    const bordered = this._boolProp('bordered');
    const compact  = this._boolProp('compact');

    const classes = [
      'qhr-table-container',
      striped ? 'qhr-table--striped' : '',
      bordered ? 'qhr-table--bordered' : '',
      compact ? 'qhr-table--compact' : '',
    ].filter(Boolean).join(' ');

    this.innerHTML = `<div class="${classes}">${this._tableHTML || ''}</div>`;

    // Ensure inner <table> has .qhr-table class
    const table = this.querySelector('table');
    if (table && !table.classList.contains('qhr-table')) {
      table.classList.add('qhr-table');
    }
  }
}

customElements.define('qhr-table', QhrTable);
