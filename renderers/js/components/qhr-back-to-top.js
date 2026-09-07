/**
 * Qahera UI Kit — <qhr-back-to-top> Web Component
 * Floating scroll-to-top button that appears after scrolling down.
 *
 * @attr {string} threshold - Scroll distance in px before showing (default: "300")
 */
import { QaheraElement, QHR_ICON_PATHS } from '../qhr-core.js';

export class QhrBackToTop extends QaheraElement {
  static get observedAttributes() { return ['threshold']; }

  _render() {
    this.innerHTML = `<button type="button" class="qhr-back-to-top" aria-label="العودة إلى أعلى الصفحة" style="display:none;"><svg class="qhr-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['chevron-up']}"/></svg></button>`;
  }

  _bind() {
    const btn = this.querySelector('.qhr-back-to-top');
    if (!btn) return;

    const threshold = parseInt(this._prop('threshold', '300'), 10);

    // Scroll listener
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > threshold ? '' : 'none';
    }, { signal: this._signal, passive: true });

    // Click to scroll top
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this._emit('click');
    }, { signal: this._signal });
  }
}

customElements.define('qhr-back-to-top', QhrBackToTop);
