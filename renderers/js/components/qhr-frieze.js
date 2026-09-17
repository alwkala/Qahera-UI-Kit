/**
 * Qahera UI Kit — <qhr-frieze> Web Component
 * Continuous architectural relief border and rhythmic decorative band.
 *
 * @attr {string} variant - subtle|outline|solid (default: "subtle")
 * @attr {string} size    - sm|md|lg (default: "md")
 * @attr {string} label   - Optional band label
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrFrieze extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size', 'label']; }

  connectedCallback() {
    this._slotContent = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const variant = this._prop('variant', 'subtle');
    const size    = this._prop('size', 'md');
    const label   = this._prop('label');

    this.className = `qhr-frieze qhr-frieze--${variant} qhr-frieze--${size}`;
    this.setAttribute('role', 'separator');

    const motifSvg = '<span class="qhr-frieze__motif"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v2H2V6zm2 4h3v4H4v-4zm5 0h3v4H9v-4zm5 0h3v4h-3v-4zm5 0h2v4h-2v-4zM2 16h20v2H2v-2z"/></svg></span>';
    const labelHtml = label ? `<span class="qhr-frieze__label">${label}</span>` : '';

    this.innerHTML = `<div class="qhr-frieze__track">${motifSvg}${labelHtml}${this._slotContent || ''}${motifSvg}</div>`;
  }
}

customElements.define('qhr-frieze', QhrFrieze);
