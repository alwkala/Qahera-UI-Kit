/**
 * Qahera UI Kit — <qhr-tooltip> Web Component
 *
 * @attr {string} text      - Tooltip text content
 * @attr {string} position  - top|bottom|start|end (default: "top")
 *
 * Usage: <qhr-tooltip text="شرح توضيحي"><qhr-btn variant="ghost">تمرير</qhr-btn></qhr-tooltip>
 */
import { QaheraElement, qhrUniqueId } from '../qhr-core.js';

export class QhrTooltip extends QaheraElement {
  static get observedAttributes() { return ['text', 'position']; }

  connectedCallback() {
    this._childrenHTML = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const text     = this._prop('text');
    const position = this._prop('position', 'top');
    const tooltipId = qhrUniqueId('tooltip');

    this.innerHTML = `<div class="qhr-tooltip-wrapper">
      <div class="qhr-tooltip-trigger" aria-describedby="${tooltipId}">${this._childrenHTML || ''}</div>
      <div id="${tooltipId}" class="qhr-tooltip qhr-tooltip--${position}" role="tooltip" style="display:none;">${text}</div>
    </div>`;
  }

  _bind() {
    const trigger = this.querySelector('.qhr-tooltip-trigger');
    const tooltip = this.querySelector('.qhr-tooltip');
    if (!trigger || !tooltip) return;

    const show = () => { tooltip.style.display = ''; };
    const hide = () => { tooltip.style.display = 'none'; };

    trigger.addEventListener('mouseenter', show, { signal: this._signal });
    trigger.addEventListener('mouseleave', hide, { signal: this._signal });
    trigger.addEventListener('focusin', show, { signal: this._signal });
    trigger.addEventListener('focusout', hide, { signal: this._signal });
  }
}

customElements.define('qhr-tooltip', QhrTooltip);
