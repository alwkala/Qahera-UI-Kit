/**
 * Qahera UI Kit — <qhr-avatar> Web Component
 *
 * @attr {string} initials - 1-2 character initials
 * @attr {string} src      - Image URL (takes precedence over initials)
 * @attr {string} alt      - Alt text for image
 * @attr {string} shape    - circle|rounded|square (default: "circle")
 * @attr {string} size     - xs|sm|md|lg|xl (default: "md")
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrAvatar extends QaheraElement {
  static get observedAttributes() { return ['initials', 'src', 'alt', 'shape', 'size']; }

  _render() {
    const initials = this._prop('initials');
    const src      = this._prop('src');
    const alt      = this._prop('alt', '');
    const shape    = this._prop('shape', 'circle');
    const size     = this._prop('size', 'md');

    const classes = `qhr-avatar qhr-avatar--${shape} qhr-avatar--${size}`;

    if (src) {
      this.innerHTML = `<span class="${classes}"><img src="${src}" alt="${alt}" class="qhr-avatar-img" /></span>`;
    } else {
      this.innerHTML = `<span class="${classes}">${initials || ''}</span>`;
    }
  }
}

customElements.define('qhr-avatar', QhrAvatar);
