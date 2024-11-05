import {html, LitElement} from 'lit';
import {IconSVG} from '../styles/_icon-svg';

class IconTable extends LitElement {
  static properties = {
    color: {type: String},
    size: {type: String},
  };

  static styles = [IconSVG];

  updated() {
    this.style.setProperty('--icon-size', this.size || '24px');
    this.style.setProperty('--icon-color', this.color || 'currentColor');
  }

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-width="2"
          d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
        />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-table', IconTable);
