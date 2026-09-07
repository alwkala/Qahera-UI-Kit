/**
 * Qahera UI Kit — <qhr-preloader> Web Component
 * Full-screen or inline loading overlay with Qahera branding.
 *
 * @attr {string}  mode    - fullscreen|inline (default: "fullscreen")
 * @attr {string}  text    - Loading message text
 * @attr {boolean} active  - Show/hide the preloader
 */
import { QaheraElement, QHR_ICON_PATHS } from '../qhr-core.js';

export class QhrPreloader extends QaheraElement {
  static get observedAttributes() { return ['mode', 'text', 'active']; }

  _render() {
    const mode   = this._prop('mode', 'fullscreen');
    const text   = this._prop('text', '');
    const active = this._boolProp('active');

    if (!active) {
      this.innerHTML = '';
      this.style.display = 'none';
      return;
    }

    this.style.display = '';

    const isFullscreen = mode === 'fullscreen';
    const wrapperClass = isFullscreen ? 'qhr-preloader qhr-preloader--fullscreen' : 'qhr-preloader qhr-preloader--inline';

    let html = `<div class="${wrapperClass}">`;
    html += `<div class="qhr-preloader-content">`;
    html += `<svg class="qhr-icon qhr-icon--spin qhr-preloader-spinner" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['spinner']}"/></svg>`;
    if (text) html += `<p class="qhr-preloader-text">${text}</p>`;
    html += '</div></div>';

    this.innerHTML = html;
  }
}

customElements.define('qhr-preloader', QhrPreloader);
