/**
 * Qahera UI Kit — <qhr-callout> Web Component
 *
 * @attr {string} tone  - neutral|info|success|warning|danger
 * @attr {string} title - Callout title
 */
import { QaheraElement } from '../qhr-core.js';

export class QhrCallout extends QaheraElement {
  static get observedAttributes() { return ['tone', 'title']; }

  _render() {
    const tone = this._prop('tone', 'neutral');
    const title = this._prop('title', '');

    const classes = [
      'qhr-callout',
      tone !== 'neutral' ? `qhr-callout--${tone}` : ''
    ].filter(Boolean).join(' ');

    this.classList.add(...classes.split(' '));
    this.setAttribute('role', 'note');

    if (title && !this.querySelector('.qhr-callout-title')) {
      const h4 = document.createElement('h4');
      h4.className = 'qhr-callout-title';
      h4.textContent = title;
      this.prepend(h4);
    }
  }
}

customElements.define('qhr-callout', QhrCallout);
