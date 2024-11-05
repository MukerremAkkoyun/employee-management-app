import {html, css, LitElement} from 'lit';
import {IconSVG} from '../styles/_icon-svg';

class IconTrFlag extends LitElement {
  static properties = {
    color: {type: String},
    size: {type: String},
  };

  static styles = [
    IconSVG,
    css`
      svg {
        stroke: none;
      }
    `,
  ];

  updated() {
    this.style.setProperty('--icon-size', this.size || '32px');
    this.style.setProperty('--icon-color', this.color || 'currentColor');
  }

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#d12d24" />
        <path
          d="M27 4H5a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16Z"
          opacity=".15"
        />
        <path
          d="M27 5H5a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3V8a3 3 0 0 0-3-3Z"
          fill="#fff"
          opacity=".2"
        />
        <path
          fill="#fff"
          d="M19.807 16 21 14.358l-1.931.627-1.193-1.643v2.031L15.945 16l1.931.627v2.031l1.193-1.643 1.931.627L19.807 16z"
        />
        <path
          d="M15.953 19.325a4.471 4.471 0 1 1 .337-6.314 5.59 5.59 0 1 0 0 5.977 4.465 4.465 0 0 1-.337.337Z"
          fill="#fff"
        />
      </svg>
      <slot name="text" class="icon-text"></slot>
    `;
  }
}

customElements.define('icon-tr-flag', IconTrFlag);
