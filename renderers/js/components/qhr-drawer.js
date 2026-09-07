import { QaheraElement } from '../qhr-core.js';

export class QhrDrawer extends QaheraElement {
  static get observedAttributes() { return ['placement', 'open']; }

  _render() {
    const placement = this._prop('placement', 'end');
    const isOpen = this._boolProp('open');

    this.innerHTML = `
      <div class="qhr-drawer-backdrop ${isOpen ? 'is-open' : ''}" aria-hidden="true"></div>
      <div class="qhr-drawer qhr-drawer--${placement} ${isOpen ? 'is-open' : ''}" role="dialog" aria-modal="true">
        <div class="qhr-drawer-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  _bind() {
    const backdrop = this.querySelector('.qhr-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.removeAttribute('open');
        this._dispatch('qhr:close');
      });
    }
  }
}

customElements.define('qhr-drawer', QhrDrawer);
