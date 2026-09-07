import { QaheraElement } from '../qhr-core.js';

export class QhrTreeview extends QaheraElement {
  static get observedAttributes() { return ['variant']; }

  _render() {
    this.innerHTML = `<div class="qhr-treeview" role="tree"><slot></slot></div>`;
  }
}

customElements.define('qhr-treeview', QhrTreeview);
