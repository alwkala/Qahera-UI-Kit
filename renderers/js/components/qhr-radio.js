/**
 * Qahera UI Kit — <qhr-radio> Web Component
 *
 * @attr {string}  name     - Radio group name
 * @attr {string}  label
 * @attr {string}  value
 * @attr {boolean} checked
 * @attr {boolean} disabled
 * @fires qhr:change
 */
import { QaheraElement, qhrUniqueId } from '../qhr-core.js';

export class QhrRadio extends QaheraElement {
  static get observedAttributes() { return ['name', 'label', 'value', 'checked', 'disabled']; }

  _render() {
    const name     = this._prop('name');
    const label    = this._prop('label');
    const value    = this._prop('value', '');
    const checked  = this._boolProp('checked');
    const disabled = this._boolProp('disabled');

    const fieldId = this.id || qhrUniqueId('qhr-radio');

    const attrs = [
      `type="radio"`,
      `id="${fieldId}"`,
      name ? `name="${name}"` : '',
      `value="${value}"`,
      `class="qhr-radio"`,
      checked ? 'checked' : '',
      disabled ? 'disabled' : '',
    ].filter(Boolean).join(' ');

    let html = `<div class="qhr-radio-wrapper"><input ${attrs}>`;
    if (label) html += `<label for="${fieldId}" class="qhr-radio-label">${label}</label>`;
    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const input = this.querySelector('input');
    if (!input) return;
    input.addEventListener('change', (e) => {
      this._emit('change', { checked: e.target.checked, value: this._prop('value'), name: this._prop('name') });
    }, { signal: this._signal });
  }

  get checked() {
    const input = this.querySelector('input');
    return input ? input.checked : this._boolProp('checked');
  }

  set checked(v) {
    if (v) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }
}

customElements.define('qhr-radio', QhrRadio);
