/**
 * Qahera UI Kit — <qhr-toast> Web Component
 * Toast notification container with programmatic API.
 *
 * Usage:
 *   const toaster = document.querySelector('qhr-toast');
 *   toaster.add('عنوان', 'رسالة', 'success');
 *
 * @attr {string} position - top-end|top-start|bottom-end|bottom-start (default: "top-end")
 * @attr {string} duration - Auto-dismiss ms (default: "5000", 0 = manual)
 */
import { QaheraElement, QHR_ICON_PATHS, QHR_TONE_ICONS, qhrUniqueId } from '../qhr-core.js';

export class QhrToast extends QaheraElement {
  static get observedAttributes() { return ['position', 'duration']; }

  constructor() {
    super();
    /** @type {Array<{id:string,title:string,message:string,tone:string}>} */
    this._items = [];
    this._timers = new Map();
  }

  _render() {
    const position = this._prop('position', 'top-end');
    let html = `<div class="qhr-toast-container qhr-toast-container--${position}" aria-live="polite">`;

    for (const item of this._items) {
      const iconName = QHR_TONE_ICONS[item.tone] || 'info';
      const iconPath = QHR_ICON_PATHS[iconName];

      html += `<div class="qhr-toast qhr-toast--${item.tone}" role="status" data-toast-id="${item.id}">`;
      html += `<div class="qhr-toast-icon"><svg class="qhr-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPath}"/></svg></div>`;
      html += '<div class="qhr-toast-content">';
      html += `<strong class="qhr-toast-title">${item.title}</strong>`;
      if (item.message) html += `<p class="qhr-toast-message">${item.message}</p>`;
      html += '</div>';
      html += `<button type="button" class="qhr-toast-close" data-dismiss="${item.id}" aria-label="إغلاق الإشعار"><svg class="qhr-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${QHR_ICON_PATHS['close']}"/></svg></button>`;
      html += '</div>';
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    this.querySelectorAll('.qhr-toast-close').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.dismiss;
        this.remove(id);
      }, { signal: this._signal });
    });
  }

  /**
   * Add a toast notification
   * @param {string} title
   * @param {string} message
   * @param {string} tone - info|success|warning|danger
   */
  add(title, message = '', tone = 'info') {
    const id = qhrUniqueId('toast');
    this._items.push({ id, title, message, tone });
    this._render();
    this._bind();

    const duration = parseInt(this._prop('duration', '5000'), 10);
    if (duration > 0) {
      const timer = setTimeout(() => this.remove(id), duration);
      this._timers.set(id, timer);
    }

    this._emit('open', { id, title, tone });
    return id;
  }

  /**
   * Remove a toast by ID
   * @param {string} id
   */
  remove(id) {
    const timer = this._timers.get(id);
    if (timer) { clearTimeout(timer); this._timers.delete(id); }

    this._items = this._items.filter(i => i.id !== id);
    this._render();
    this._bind();
    this._emit('close', { id });
  }

  _cleanup() {
    for (const timer of this._timers.values()) clearTimeout(timer);
    this._timers.clear();
    this._items = [];
  }
}

customElements.define('qhr-toast', QhrToast);
