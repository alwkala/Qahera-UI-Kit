/**
 * Qahera UI Kit — <qhr-select> Web Component
 *
 * @attr {string}  name        - Field name
 * @attr {string}  label       - Label text
 * @attr {string}  placeholder - Default disabled option text
 * @attr {string}  value       - Selected value
 * @attr {string}  hint
 * @attr {string}  error
 * @attr {boolean} required
 * @attr {boolean} disabled
 * @fires qhr:change
 *
 * Usage: <qhr-select label="الدولة" name="country" placeholder="اختر...">
 *          <option value="EG">مصر</option>
 *          <option value="SA">السعودية</option>
 *        </qhr-select>
 */
import { QaheraElement, QHR_ICON_PATHS, qhrUniqueId } from '../qhr-core.js';

export class QhrSelect extends QaheraElement {
  static get observedAttributes() {
    return ['name', 'label', 'placeholder', 'value', 'hint', 'error', 'required', 'disabled'];
  }

  connectedCallback() {
    // Capture original <option> children before render
    this._options = Array.from(this.querySelectorAll('option')).map(opt => ({
      value: opt.value,
      text: opt.textContent,
      disabled: opt.disabled,
      selected: opt.selected,
    }));
    super.connectedCallback();
  }

  _render() {
    const name        = this._prop('name');
    const label       = this._prop('label');
    const placeholder = this._prop('placeholder', '');
    const value       = this._prop('value', '');
    const hint        = this._prop('hint');
    const error       = this._prop('error');
    const required    = this._boolProp('required');
    const disabled    = this._boolProp('disabled');
    const hasError    = !!error;

    const fieldId = this.id || qhrUniqueId('qhr-select');

    let html = '<div class="qhr-form-group">';

    if (label) {
      html += `<label for="${fieldId}" class="qhr-label">${label}`;
      if (required) html += ' <span class="qhr-label-required">*</span>';
      html += '</label>';
    }

    html += '<div class="qhr-select-wrapper">';

    const selectAttrs = [
      `id="${fieldId}"`,
      name ? `name="${name}"` : '',
      `class="qhr-select${hasError ? ' qhr-select--error' : ''}"`,
      required ? 'required' : '',
      disabled ? 'disabled' : '',
      hasError ? 'aria-invalid="true"' : '',
    ].filter(Boolean).join(' ');

    html += `<select ${selectAttrs}>`;

    if (placeholder) {
      html += `<option value="" disabled selected>${placeholder}</option>`;
    }

    const options = this._options || [];
    for (const opt of options) {
      const sel = opt.value === value ? ' selected' : '';
      html += `<option value="${opt.value}"${sel}>${opt.text}</option>`;
    }

    html += '</select>';

    // Chevron arrow
    html += `<span class="qhr-select-arrow"><svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['chevron-down']}"/></svg></span>`;

    html += '</div>';

    if (error) {
      html += `<span class="qhr-form-error">${error}</span>`;
    } else if (hint) {
      html += `<span class="qhr-form-hint">${hint}</span>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const select = this.querySelector('select');
    if (!select) return;
    select.addEventListener('change', (e) => {
      this._emit('change', { value: e.target.value, name: this._prop('name') });
    }, { signal: this._signal });
  }

  get value() {
    const s = this.querySelector('select');
    return s ? s.value : this._prop('value', '');
  }

  set value(v) {
    this.setAttribute('value', v);
    const s = this.querySelector('select');
    if (s) s.value = v;
  }
}

customElements.define('qhr-select', QhrSelect);
