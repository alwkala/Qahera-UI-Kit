/**
 * Qahera UI Kit — <qhr-tabs> Web Component
 * Accessible tabbed interface with keyboard navigation.
 *
 * @attr {string} default-tab - ID of default active tab
 * @fires qhr:change
 *
 * Usage:
 *   <qhr-tabs default-tab="overview">
 *     <div slot="tabs">
 *       <button data-tab="overview">نظرة عامة</button>
 *       <button data-tab="security">الأمان</button>
 *     </div>
 *     <div data-panel="overview">محتوى النظرة العامة</div>
 *     <div data-panel="security">محتوى الأمان</div>
 *   </qhr-tabs>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrTabs extends QaheraElement {
  static get observedAttributes() { return ['default-tab']; }

  constructor() {
    super();
    this._activeTab = '';
  }

  connectedCallback() {
    // Capture children before render
    this._tabsSlot  = this.querySelector('[slot="tabs"]')?.innerHTML || '';
    this._panels = {};
    this.querySelectorAll('[data-panel]').forEach((panel) => {
      this._panels[panel.dataset.panel] = panel.innerHTML;
    });

    // Determine default tab
    this._activeTab = this._prop('default-tab') || Object.keys(this._panels)[0] || '';

    super.connectedCallback();
  }

  _render() {
    let html = '<div class="qhr-tabs">';

    // Tab list
    html += '<div class="qhr-tabs-list" role="tablist">';
    // Parse tab buttons from stored HTML
    const temp = document.createElement('div');
    temp.innerHTML = this._tabsSlot;
    const buttons = temp.querySelectorAll('[data-tab]');
    buttons.forEach((btn) => {
      const tabId = btn.dataset.tab;
      const isActive = tabId === this._activeTab;
      html += `<button type="button" class="qhr-tab${isActive ? ' is-active' : ''}" role="tab" data-tab="${tabId}" aria-selected="${isActive}" aria-controls="qhr-panel-${tabId}">${btn.innerHTML}</button>`;
    });
    html += '</div>';

    // Panels
    for (const [id, content] of Object.entries(this._panels)) {
      const isActive = id === this._activeTab;
      html += `<div id="qhr-panel-${id}" class="qhr-tab-panel" role="tabpanel" style="${isActive ? '' : 'display:none;'}">${content}</div>`;
    }

    html += '</div>';
    this.innerHTML = html;
  }

  _bind() {
    this.querySelectorAll('.qhr-tab[data-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        this._activeTab = tab.dataset.tab;
        this._render();
        this._bind();
        this._emit('change', { tab: this._activeTab });
      }, { signal: this._signal });
    });

    // Keyboard navigation (arrow keys)
    const tabList = this.querySelector('.qhr-tabs-list');
    if (!tabList) return;
    tabList.addEventListener('keydown', (e) => {
      const tabs = Array.from(tabList.querySelectorAll('.qhr-tab'));
      const idx  = tabs.indexOf(document.activeElement);
      if (idx < 0) return;

      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = (idx + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = (idx - 1 + tabs.length) % tabs.length;
      }
      if (next >= 0) {
        e.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      }
    }, { signal: this._signal });
  }

  /** Programmatic tab selection */
  setTab(tabId) {
    this._activeTab = tabId;
    this._render();
    this._bind();
    this._emit('change', { tab: tabId });
  }
}

customElements.define('qhr-tabs', QhrTabs);
