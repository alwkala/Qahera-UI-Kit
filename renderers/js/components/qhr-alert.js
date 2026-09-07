/**
 * Qahera UI Kit — <qhr-alert> Web Component
 *
 * @attr {string}  tone       - neutral|info|success|warning|danger (default: "info")
 * @attr {string}  title      - Alert title text
 * @attr {boolean} dismissible - Show close button
 * @fires qhr:close
 */
import { QaheraElement, QHR_ICON_PATHS, QHR_TONE_ICONS } from '../qhr-core.js';

export class QhrAlert extends QaheraElement {
  static get observedAttributes() { return ['tone', 'title', 'dismissible']; }

  connectedCallback() {
    this._message = this.textContent.trim();
    super.connectedCallback();
  }

  _render() {
    const tone        = this._prop('tone', 'info');
    const title       = this._prop('title');
    const dismissible = this._boolProp('dismissible');
    const message     = this._message || '';

    const iconName = QHR_TONE_ICONS[tone] || 'info';
    const iconPath = QHR_ICON_PATHS[iconName];

    let html = `<div class="qhr-alert qhr-alert--${tone}" role="alert" data-tone="${tone}">`;

    // Icon
    html += `<div class="qhr-alert-icon"><svg class="qhr-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPath}"/></svg></div>`;

    // Content
    html += '<div class="qhr-alert-content">';
    if (title) html += `<strong class="qhr-alert-title">${title}</strong>`;
    if (message) html += `<p class="qhr-alert-message">${message}</p>`;
    html += '</div>';

    // Close button
    if (dismissible) {
      html += `<button type="button" class="qhr-alert-close" aria-label="إغلاق التنبيه"><svg class="qhr-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['close']}"/></svg></button>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const closeBtn = this.querySelector('.qhr-alert-close');
    if (!closeBtn) return;
    closeBtn.addEventListener('click', () => {
      this._emit('close', { tone: this._prop('tone', 'info') });
      this.remove();
    }, { signal: this._signal });
  }
}

customElements.define('qhr-alert', QhrAlert);
