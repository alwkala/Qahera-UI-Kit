/**
 * Qahera UI Kit — <qhr-btn> Web Component
 * Semantic button with variant, size, icon, loading, and disabled states.
 *
 * @attr {string}  variant  - primary|secondary|outline|ghost|link|destructive (default: "primary")
 * @attr {string}  size     - xs|sm|md|lg|xl (default: "md")
 * @attr {string}  icon     - Icon name to prepend (from registry)
 * @attr {boolean} loading  - Shows spinner and disables interaction
 * @attr {boolean} disabled
 * @fires qhr:click
 */
import { QaheraElement, QHR_ICON_PATHS, QHR_SIZE_PX, qhrIconSVG } from '../qhr-core.js';

export class QhrButton extends QaheraElement {
  static get observedAttributes() {
    return ['variant', 'size', 'icon', 'loading', 'disabled'];
  }

  _render() {
    const variant  = this._prop('variant', 'primary');
    const size     = this._prop('size', 'md');
    const iconName = this._prop('icon');
    const loading  = this._boolProp('loading');
    const disabled = this._boolProp('disabled');

    const classes = [
      'qhr-btn',
      `qhr-btn--${variant}`,
      `qhr-btn--${size}`,
      loading ? 'is-loading' : '',
    ].filter(Boolean).join(' ');

    let iconHtml = '';
    if (loading) {
      const spinPx = QHR_SIZE_PX[size] || 16;
      iconHtml = `<svg class="qhr-spinner qhr-icon" width="${spinPx}" height="${spinPx}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['spinner']}"/></svg>`;
    } else if (iconName && QHR_ICON_PATHS[iconName]) {
      const iconPx = QHR_SIZE_PX[size] || 16;
      iconHtml = `<svg class="qhr-icon qhr-icon--${iconName}" width="${iconPx}" height="${iconPx}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS[iconName]}"/></svg>`;
    }

    this.innerHTML = `<button type="button" class="${classes}" data-variant="${variant}" data-size="${size}" ${disabled || loading ? 'disabled' : ''}>${iconHtml}<span><slot></slot></span></button>`;

    // Move slotted text content into <span>
    const span = this.querySelector('span');
    const btn = this.querySelector('button');
    if (span && btn) {
      // Collect text nodes from the host that aren't inside <button>
      const textContent = this.getAttribute('label') || '';
      if (textContent) {
        span.textContent = textContent;
      }
    }
  }

  _bind() {
    const btn = this.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      if (!this._boolProp('disabled') && !this._boolProp('loading')) {
        this._emit('click', { originalEvent: e });
      }
    }, { signal: this._signal });
  }
}

customElements.define('qhr-btn', QhrButton);
