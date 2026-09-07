/**
 * Qahera UI Kit — <qhr-switch> Web Component
 *
 * @attr {string} name    - Form field name
 * @attr {boolean} checked- Checked state
 * @attr {boolean} disabled
 * @attr {string} label   - Switch label
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrSwitch extends QaheraElement {
  static get observedAttributes() { return ['name', 'checked', 'disabled', 'label']; }

  _render() {
    const name = this._prop('name', 'switch');
    const checked = this._boolProp('checked');
    const disabled = this._boolProp('disabled');
    const label = this._prop('label', '');

    this.innerHTML = `
      <label class="qhr-switch" style="${disabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
        <input
          type="checkbox"
          role="switch"
          name="${name}"
          class="qhr-switch-input"
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled' : ''}
        >
        <span class="qhr-switch-track" aria-hidden="true">
          <span class="qhr-switch-thumb"></span>
        </span>
        ${label ? `<span style="font-size: var(--qhr-text-sm, 14px); font-weight: 600;">${label}</span>` : ''}
      </label>
    `;

    const input = this.querySelector('input');
    if (input) {
      input.addEventListener('change', (e) => {
        this.toggleAttribute('checked', e.target.checked);
        this.dispatchEvent(new CustomEvent('qhr-change', {
          detail: { checked: e.target.checked },
          bubbles: true
        }));
      });
    }
  }
}

customElements.define('qhr-switch', QhrSwitch);
