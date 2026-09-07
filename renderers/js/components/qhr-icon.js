/**
 * Qahera UI Kit — <qhr-icon> Web Component
 * Renders canonical SVG icons from the 41-icon registry.
 *
 * @attr {string} name   - Icon name (e.g. "search", "delete", "check")
 * @attr {string} size   - xs|sm|md|lg|xl or pixel number (default: "md")
 * @fires qhr:click
 */
import { QaheraElement, QHR_ICON_PATHS, QHR_SIZE_PX } from '../qhr-core.js';

export class QhrIcon extends QaheraElement {
  static get observedAttributes() { return ['name', 'size']; }

  _render() {
    const name = this._prop('name');
    const sizeAttr = this._prop('size', 'md');
    const px = QHR_SIZE_PX[sizeAttr] || parseInt(sizeAttr, 10) || 20;
    const pathD = QHR_ICON_PATHS[name];

    if (!pathD) {
      this.innerHTML = '';
      if (name) console.warn(`[qhr-icon] Unknown icon "${name}". See icons/registry.yaml.`);
      return;
    }

    const spin = name === 'spinner' ? ' qhr-icon--spin' : '';
    this.innerHTML = `<svg class="qhr-icon qhr-icon--${name}${spin}" width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${pathD}"/></svg>`;
  }
}

customElements.define('qhr-icon', QhrIcon);
