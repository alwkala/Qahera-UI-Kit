import { QaheraElement } from '../qhr-core.js';

export class QhrChip extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'removable', 'disabled']; }

  _render() {
    const variant = this._prop('variant', 'default');
    const size = this._prop('size', 'md');
    const removable = this._boolProp('removable');
    const disabled = this._boolProp('disabled');

    const classes = [
      'qhr-chip',
      `qhr-chip--${variant}`,
      `qhr-chip--${size}`,
      disabled ? 'is-disabled' : '',
    ].filter(Boolean).join(' ');

    const removeBtn = removable && !disabled
      ? '<button type="button" class="qhr-chip-remove" aria-label="Remove"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>'
      : '';

    this.innerHTML = `<span class="${classes}" data-variant="${variant}" data-size="${size}" ${disabled ? 'aria-disabled="true"' : ''}><span class="qhr-chip-label"></span>${removeBtn}</span>`;
  }

  connectedCallback() {
    this._text = this.textContent.trim();
    super.connectedCallback();
    const label = this.querySelector('.qhr-chip-label');
    if (label && this._text) label.textContent = this._text;
  }

  _bind() {
    const btn = this.querySelector('.qhr-chip-remove');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._dispatch('qhr:remove', { id: this.id });
      });
    }
  }
}

customElements.define('qhr-chip', QhrChip);
