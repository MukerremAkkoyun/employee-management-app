import {LitElement, html, css} from 'lit';

export class SearchBar extends LitElement {
  static properties = {
    placeholder: {type: String},
    value: {type: String},
  };

  constructor() {
    super();
    this.placeholder = '';
    this.value = '';
  }

  render() {
    return html`
      <input
        type="text"
        class="search-input"
        name="search-input"
        placeholder="${this.placeholder}"
        .value="${this.value}"
        @input="${this._onInput}"
      />
    `;
  }

  _onInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent('search-query-change', {
        detail: {query: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    .search-input {
      height: 2rem;
      padding: 0 0.5rem;
      border: 1px solid var(--c-gray-600, #999999);
      border-radius: 0.25rem;
      min-width: 15rem;
    }

    /* Responsive styles */
    :host(.viewport-extra-small) .search-input {
      min-width: 90%;
    }
  `;
}

customElements.define('v-search-bar', SearchBar);
