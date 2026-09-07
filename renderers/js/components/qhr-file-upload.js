import { QaheraElement } from '../qhr-core.js';

export class QhrFileUpload extends QaheraElement {
  static get observedAttributes() { return ['accept', 'multiple']; }

  _render() {
    const accept = this._prop('accept', '*');
    const multiple = this._boolProp('multiple');

    this.innerHTML = `
      <div class="qhr-file-upload">
        <input type="file" class="qhr-file-upload-input" accept="${accept}" ${multiple ? 'multiple' : ''} style="display: none;">
        <div class="qhr-file-upload-dropzone">
          <svg class="qhr-file-upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <div class="qhr-file-upload-label">
            <span>انقر لاختيار الملفات أو اسحبها إلى هنا</span>
          </div>
        </div>
      </div>
    `;
  }

  _bind() {
    const dropzone = this.querySelector('.qhr-file-upload-dropzone');
    const input = this.querySelector('.qhr-file-upload-input');
    if (dropzone && input) {
      dropzone.addEventListener('click', () => input.click());
      input.addEventListener('change', () => {
        this._dispatch('qhr:select', { files: Array.from(input.files) });
      });
    }
  }
}

customElements.define('qhr-file-upload', QhrFileUpload);
