import { QaheraElement } from '../qhr-core.js';

export class QhrCanvasSparks extends QaheraElement {
  static get observedAttributes() { return ['count']; }

  _render() {
    this.innerHTML = `<div class="qhr-canvas-sparks-wrapper"><canvas style="width: 100%; height: 100%; display: block;" aria-hidden="true"></canvas></div>`;
  }
}

customElements.define('qhr-canvas-sparks', QhrCanvasSparks);
