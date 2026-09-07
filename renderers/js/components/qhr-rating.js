import { QaheraElement } from '../qhr-core.js';

export class QhrRating extends QaheraElement {
  static get observedAttributes() { return ['value', 'max', 'readonly']; }

  _render() {
    const val = parseFloat(this._prop('value', 0));
    const max = parseInt(this._prop('max', 5), 10);
    const readonly = this._boolProp('readonly');

    let starsHtml = '';
    for (let i = 1; i <= max; i++) {
      const filled = i <= val;
      starsHtml += `<button type="button" class="qhr-rating-star ${filled ? 'is-filled' : ''}" data-index="${i}" ${readonly ? 'tabindex="-1"' : ''} aria-label="Rate ${i}"><svg width="18" height="18" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>`;
    }

    this.innerHTML = `<div class="qhr-rating" role="slider" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="${max}">${starsHtml}</div>`;
  }

  _bind() {
    if (this._boolProp('readonly')) return;
    const stars = this.querySelectorAll('.qhr-rating-star');
    stars.forEach(s => {
      s.addEventListener('click', () => {
        const idx = s.getAttribute('data-index');
        this.setAttribute('value', idx);
        this._dispatch('qhr:change', { value: parseInt(idx, 10) });
      });
    });
  }
}

customElements.define('qhr-rating', QhrRating);
