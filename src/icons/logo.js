import {html, css, LitElement} from 'lit';
import {IconSVG} from '../styles/_icon-svg';

class IconLogo extends LitElement {
  static properties = {
    color: {type: String},
    size: {type: String},
  };

  static styles = [
    IconSVG,
    css`
      :host {
        gap: 0.5rem;
      }
      svg {
        fill: var(--c-orange-700, #ff6200);
      }
    `,
  ];

  updated() {
    this.style.setProperty('--icon-size', this.size || '23px');
    this.style.setProperty('--icon-color', this.color || 'currentColor');
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="none"
        stroke-width="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 23 23"
      >
        <rect x="1" y="1" width="22" height="22" rx="2" ry="2" />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-logo', IconLogo);
