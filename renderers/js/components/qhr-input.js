/**
 * Qahera UI Kit — <qhr-input> Web Component
 *
 * @attr {string}  type        - text|email|password|number|tel|url|search (default: "text")
 * @attr {string}  name        - Field name
 * @attr {string}  label       - Label text
 * @attr {string}  placeholder
 * @attr {string}  value
 * @attr {string}  hint        - Helper text below field
 * @attr {string}  error       - Error message (activates danger state)
 * @attr {string}  icon        - Canonical icon name for start position
 * @attr {boolean} required
 * @attr {boolean} disabled
 * @attr {boolean} readonly
 * @fires qhr:change
 * @fires qhr:input
 */
import { QaheraElement, QHR_ICON_PATHS, qhrUniqueId } from '../qhr-core.js';

export class QhrInput extends QaheraElement {
  static get observedAttributes() {
    return ['type', 'name', 'label', 'placeholder', 'value', 'hint', 'error', 'icon', 'required', 'disabled', 'readonly'];
  }

  _render() {
    const type        = this._prop('type', 'text');
    const name        = this._prop('name');
    const label       = this._prop('label');
    const placeholder = this._prop('placeholder', '');
    const value       = this._prop('value', '');
    const hint        = this._prop('hint');
    const error       = this._prop('error');
    const iconName    = this._prop('icon');
    const required    = this._boolProp('required');
    const disabled    = this._boolProp('disabled');
    const readonly    = this._boolProp('readonly');

    const fieldId = this.id || qhrUniqueId('qhr-input');
    const hasIcon = iconName && QHR_ICON_PATHS[iconName];
    const hasError = !!error;

    let html = '<div class="qhr-form-group">';

    // Label
    if (label) {
      html += `<label for="${fieldId}" class="qhr-label">${label}`;
      if (required) html += ' <span class="qhr-label-required">*</span>';
      html += '</label>';
    }

    // Input wrapper
    html += '<div class="qhr-input-wrapper">';

    // Start icon
    if (hasIcon) {
      html += `<span class="qhr-input-icon qhr-input-icon--start"><svg class="qhr-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS[iconName]}"/></svg></span>`;
    }

    // Input element
    const inputClasses = ['qhr-input', hasIcon ? 'qhr-input--has-start-icon' : '', hasError ? 'qhr-input--error' : ''].filter(Boolean).join(' ');
    const attrs = [
      `type="${type}"`,
      `id="${fieldId}"`,
      name ? `name="${name}"` : '',
      `class="${inputClasses}"`,
      `placeholder="${placeholder}"`,
      `value="${value}"`,
      required ? 'required' : '',
      disabled ? 'disabled' : '',
      readonly ? 'readonly' : '',
      hasError ? 'aria-invalid="true"' : '',
    ].filter(Boolean).join(' ');

    html += `<input ${attrs}>`;
    html += '</div>';

    // Hint or Error
    if (error) {
      html += `<span class="qhr-form-error">${error}</span>`;
    } else if (hint) {
      html += `<span class="qhr-form-hint">${hint}</span>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const input = this.querySelector('input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this._emit('input', { value: e.target.value, name: this._prop('name') });
    }, { signal: this._signal });

    input.addEventListener('change', (e) => {
      this._emit('change', { value: e.target.value, name: this._prop('name') });
    }, { signal: this._signal });
  }

  /** Programmatic value access */
  get value() {
    const input = this.querySelector('input');
    return input ? input.value : this._prop('value', '');
  }

  set value(v) {
    this.setAttribute('value', v);
    const input = this.querySelector('input');
    if (input) input.value = v;
  }
}

customElements.define('qhr-input', QhrInput);
