/**
 * Qahera UI Kit — <qhr-menu> Web Component
 * Vertical or horizontal navigational menu with submenus, headers, and keyboard accessibility.
 *
 * @attr {string} variant - vertical|horizontal|compact|bordered|pills|khedivial|brutalist (default: "vertical")
 * @attr {string} size    - sm|md|lg (default: "md")
 * @fires qhr:select
 *
 * Usage:
 *   <qhr-menu variant="vertical">
 *     <li class="qhr-menu-title">لوحة التحكم</li>
 *     <li class="qhr-menu-item">
 *       <a href="#" class="qhr-menu-link is-active">الرئيسية</a>
 *     </li>
 *     <li class="qhr-menu-item">
 *       <a href="#" class="qhr-menu-link">المشروعات</a>
 *     </li>
 *   </qhr-menu>
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrMenu extends QaheraElement {
  static get observedAttributes() { return ['variant', 'size']; }

  connectedCallback() {
    this._initialItems = this.innerHTML;
    super.connectedCallback();
  }

  _render() {
    const variant = this._prop('variant', 'vertical');
    const size    = this._prop('size', 'md');

    const variantClass = variant ? `qhr-menu--${variant}` : '';
    const sizeClass    = size && size !== 'md' ? `qhr-menu--${size}` : '';

    this.innerHTML = `
      <nav class="qhr-menu-nav" aria-label="قائمة التنقل">
        <ul class="qhr-menu ${variantClass} ${sizeClass}".trim() role="menu">
          ${this._initialItems}
        </ul>
      </nav>
    `;
  }

  _bind() {
    const links = Array.from(this.querySelectorAll('.qhr-menu-link:not(.is-disabled)'));
    if (!links.length) return;

    links.forEach((link, idx) => {
      link.addEventListener('click', (e) => {
        links.forEach((l) => {
          l.classList.remove('is-active');
          l.removeAttribute('aria-current');
        });
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');

        this._emit('select', {
          index: idx,
          label: link.querySelector('.qhr-menu-label')?.textContent?.trim() || link.textContent?.trim() || '',
          href: link.getAttribute('href') || '#',
        });
      }, { signal: this._signal });
    });

    // Keyboard navigation (ArrowDown / ArrowUp / Home / End)
    const menuList = this.querySelector('ul.qhr-menu');
    if (!menuList) return;

    menuList.addEventListener('keydown', (e) => {
      const activeIdx = links.indexOf(document.activeElement);
      if (activeIdx < 0) return;

      let targetIdx = -1;
      if (e.key === 'ArrowDown') {
        targetIdx = (activeIdx + 1) % links.length;
      } else if (e.key === 'ArrowUp') {
        targetIdx = (activeIdx - 1 + links.length) % links.length;
      } else if (e.key === 'Home') {
        targetIdx = 0;
      } else if (e.key === 'End') {
        targetIdx = links.length - 1;
      }

      if (targetIdx >= 0) {
        e.preventDefault();
        links[targetIdx].focus();
      }
    }, { signal: this._signal });
  }
}

customElements.define('qhr-menu', QhrMenu);
