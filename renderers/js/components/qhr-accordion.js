/**
 * Qahera UI Kit — <qhr-accordion> Web Component
 * Expandable/collapsible panels with single or multiple open support.
 *
 * @attr {boolean} multiple - Allow multiple panels open simultaneously
 * @fires qhr:open
 * @fires qhr:close
 *
 * Usage:
 *   <qhr-accordion>
 *     <div data-title="السؤال الأول">الإجابة الأولى</div>
 *     <div data-title="السؤال الثاني">الإجابة الثانية</div>
 *   </qhr-accordion>
 */
import { QaheraElement, QHR_ICON_PATHS, qhrUniqueId } from '../qhr-core.js';

export class QhrAccordion extends QaheraElement {
  static get observedAttributes() { return ['multiple']; }

  constructor() {
    super();
    /** @type {Set<number>} */
    this._openPanels = new Set();
  }

  connectedCallback() {
    // Capture items before render
    this._items = [];
    this.querySelectorAll('[data-title]').forEach((el) => {
      this._items.push({
        title: el.dataset.title,
        content: el.innerHTML,
      });
    });
    super.connectedCallback();
  }

  _render() {
    const multiple = this._boolProp('multiple');

    let html = '<div class="qhr-accordion">';

    this._items.forEach((item, idx) => {
      const isOpen = this._openPanels.has(idx);
      const panelId = qhrUniqueId('accordion-panel');

      html += `<div class="qhr-accordion-item${isOpen ? ' is-open' : ''}">`;

      // Trigger
      html += `<button type="button" class="qhr-accordion-trigger" data-index="${idx}" aria-expanded="${isOpen}" aria-controls="${panelId}">`;
      html += `<span class="qhr-accordion-title">${item.title}</span>`;
      html += `<svg class="qhr-icon qhr-accordion-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['chevron-down']}"/></svg>`;
      html += '</button>';

      // Content panel
      html += `<div id="${panelId}" class="qhr-accordion-content" style="${isOpen ? '' : 'display:none;'}">`;
      html += `<div class="qhr-accordion-body">${item.content}</div>`;
      html += '</div>';

      html += '</div>';
    });

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    const multiple = this._boolProp('multiple');

    this.querySelectorAll('.qhr-accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const idx = parseInt(trigger.dataset.index, 10);
        const isOpen = this._openPanels.has(idx);

        if (isOpen) {
          this._openPanels.delete(idx);
          this._emit('close', { index: idx });
        } else {
          if (!multiple) this._openPanels.clear();
          this._openPanels.add(idx);
          this._emit('open', { index: idx });
        }

        this._render();
        this._bind();
      }, { signal: this._signal });
    });
  }

  /** Open a panel by index */
  open(idx) {
    if (!this._boolProp('multiple')) this._openPanels.clear();
    this._openPanels.add(idx);
    this._render();
    this._bind();
  }

  /** Close a panel by index */
  close(idx) {
    this._openPanels.delete(idx);
    this._render();
    this._bind();
  }
}

customElements.define('qhr-accordion', QhrAccordion);
