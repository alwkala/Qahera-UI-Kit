/**
 * Qahera UI Kit — <qhr-textarea> Web Component
 *
 * @attr {string}  name
 * @attr {string}  label
 * @attr {string}  placeholder
 * @attr {string}  value
 * @attr {string}  hint
 * @attr {string}  error
 * @attr {string}  rows   - Number of rows (default: "4")
 * @attr {boolean} required
 * @attr {boolean} disabled
 * @attr {boolean} readonly
 * @fires qhr:change
 * @fires qhr:input
 */
import { QaheraElement, qhrUniqueId } from '../qhr-core.js';

export class QhrTextarea extends QaheraElement {
  static get observedAttributes() {
    return ['name', 'label', 'placeholder', 'value', 'hint', 'error', 'rows', 'required', 'disabled', 'readonly'];
  }

  _render() {
    const name        = this._prop('name');
    const label       = this._prop('label');
    const placeholder = this._prop('placeholder', '');
    const value       = this._prop('value', '');
    const hint        = this._prop('hint');
    const error       = this._prop('error');
    const rows        = this._prop('rows', '4');
    const required    = this._boolProp('required');
    const disabled    = this._boolProp('disabled');
    const readonly    = this._boolProp('readonly');
    const hasError    = !!error;

    const fieldId = this.id || qhrUniqueId('qhr-textarea');

    let html = '<div class="qhr-form-group">';

    if (label) {
      html += `<label for="${fieldId}" class="qhr-label">${label}`;
      if (required) html += ' <span class="qhr-label-required">*</span>';
      html += '</label>';
    }

    const taAttrs = [
      `id="${fieldId}"`,
      name ? `name="${name}"` : '',
      `class="qhr-textarea${hasError ? ' qhr-textarea--error' : ''}"`,
      `placeholder="${placeholder}"`,
      `rows="${rows}"`,
      required ? 'required' : '',
      disabled ? 'disabled' : '',
      readonly ? 'readonly' : '',
      hasError ? 'aria-invalid="true"' : '',
    ].filter(Boolean).join(' ');

    html += `<textarea ${taAttrs}>${value}</textarea>`;

    if (error) {
      html += `<span class="qhr-form-error">${error}</span>`;
    } else if (hint) {
      html += `<span class="qhr-form-hint">${hint}</span>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const ta = this.querySelector('textarea');
    if (!ta) return;
    ta.addEventListener('input', (e) => {
      this._emit('input', { value: e.target.value, name: this._prop('name') });
    }, { signal: this._signal });
    ta.addEventListener('change', (e) => {
      this._emit('change', { value: e.target.value, name: this._prop('name') });
    }, { signal: this._signal });
  }

  get value() {
    const ta = this.querySelector('textarea');
    return ta ? ta.value : this._prop('value', '');
  }

  set value(v) {
    this.setAttribute('value', v);
    const ta = this.querySelector('textarea');
    if (ta) ta.value = v;
  }
}

customElements.define('qhr-textarea', QhrTextarea);
