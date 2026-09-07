/**
 * Qahera UI Kit — <qhr-modal> Web Component
 * Accessible modal dialog with backdrop, focus trap, and escape-to-close.
 *
 * @attr {string}  title
 * @attr {boolean} open    - Show/hide the modal
 * @fires qhr:open
 * @fires qhr:close
 *
 * Usage:
 *   <qhr-modal title="تأكيد العملية">
 *     <div slot="body">هل أنت متأكد؟</div>
 *     <div slot="footer"><qhr-btn variant="primary">تأكيد</qhr-btn></div>
 *   </qhr-modal>
 *
 * Programmatic: el.show(); el.hide();
 */
import { QaheraElement, QHR_ICON_PATHS, qhrUniqueId } from '../qhr-core.js';

export class QhrModal extends QaheraElement {
  static get observedAttributes() { return ['title', 'open']; }

  connectedCallback() {
    this._bodySlot   = this.querySelector('[slot="body"]')?.innerHTML || this.innerHTML;
    this._footerSlot = this.querySelector('[slot="footer"]')?.innerHTML || '';
    super.connectedCallback();
  }

  _render() {
    const title  = this._prop('title');
    const isOpen = this._boolProp('open');
    const titleId = qhrUniqueId('modal-title');

    if (!isOpen) {
      this.innerHTML = '';
      return;
    }

    let html = `<div class="qhr-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="${titleId}" tabindex="-1">`;
    html += '<div class="qhr-modal-panel">';

    // Header
    html += '<div class="qhr-modal-header">';
    if (title) html += `<h3 id="${titleId}" class="qhr-modal-title">${title}</h3>`;
    html += `<button type="button" class="qhr-modal-close" aria-label="إغلاق"><svg class="qhr-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['close']}"/></svg></button>`;
    html += '</div>';

    // Body
    html += `<div class="qhr-modal-body">${this._bodySlot || ''}</div>`;

    // Footer
    if (this._footerSlot) {
      html += `<div class="qhr-modal-footer">${this._footerSlot}</div>`;
    }

    html += '</div></div>';
    this.innerHTML = html;
  }

  _bind() {
    if (!this._boolProp('open')) return;

    // Close button
    const closeBtn = this.querySelector('.qhr-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide(), { signal: this._signal });
    }

    // Click outside panel
    const backdrop = this.querySelector('.qhr-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.hide();
      }, { signal: this._signal });
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._boolProp('open')) this.hide();
    }, { signal: this._signal });

    // Focus trap: focus the panel
    const panel = this.querySelector('.qhr-modal-panel');
    if (panel) panel.focus?.();
  }

  /** Open the modal */
  show() {
    this.setAttribute('open', '');
    this._emit('open');
  }

  /** Close the modal */
  hide() {
    this.removeAttribute('open');
    this._emit('close');
  }
}

customElements.define('qhr-modal', QhrModal);
