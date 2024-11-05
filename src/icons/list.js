import {html, LitElement} from 'lit';
import {IconSVG} from '../styles/_icon-svg';

/*
import svgStyles from '../styles/icon-svg.css' with { type: 'css' };
CSS Module Scripts Proposal is not supported
*/

class IconList extends LitElement {
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
          stroke-linecap="round"
          stroke-width="2"
          d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
        />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-list', IconList);
