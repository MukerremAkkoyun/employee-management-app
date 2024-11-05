import {LitElement, html, css} from 'lit';
import {Constants} from '../../styles/_constants.js';
import {getTranslation} from '../../i18n/index.js';

export class Pagination extends LitElement {
  static properties = {
    currentPage: {type: Number},
    totalPages: {type: Number},
    translations: {type: Object},
  };

  render() {
    return html`
      <div class="pagination">
        <v-button
          class="first"
          @click="${this._goToFirstPage}"
          ?disabled="${this.currentPage === 1}"
        >
          ${getTranslation(this.translations, 'first')}
        </v-button>

        <v-button
          class="previous"
          @click="${this._prevPage}"
          ?disabled="${this.currentPage === 1}"
          >${getTranslation(this.translations, 'previous')}
        </v-button>

        <span>
          <span class="page">${getTranslation(this.translations, 'page')}</span>
          ${`${this.currentPage} ${getTranslation(
            this.translations,
            'pageOf'
          )} ${this.totalPages} `}
        </span>

        <v-button
          class="next"
          @click="${this._nextPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${getTranslation(this.translations, 'next')}
        </v-button>

        <v-button
          class="last"
          @click="${this._goToLastPage}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          ${getTranslation(this.translations, 'last')}
        </v-button>
      </div>
    `;
  }

  _goToFirstPage() {
    this._emitPageChange(1);
  }

  _prevPage() {
    this._emitPageChange(this.currentPage - 1);
  }

  _nextPage() {
    this._emitPageChange(this.currentPage + 1);
  }

  _goToLastPage() {
    this._emitPageChange(this.totalPages);
  }

  _emitPageChange(page) {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {page},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    Constants,
    css`
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;
      }
    `,
  ];
}

customElements.define('v-pagination', Pagination);
