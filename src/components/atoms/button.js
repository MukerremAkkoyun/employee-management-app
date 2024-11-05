import {LitElement, html, css} from 'lit';

export class Button extends LitElement {
  static properties = {
    disabled: {type: Boolean},
    variant: {type: String},
    type: {type: 'button' | 'submit' | 'reset' | 'menu'},
  };

  constructor() {
    super();
    this.disabled = false;
    this.variant = 'primary';
    this.type = 'button';
  }

  static styles = [
    css`
      :host {
        display: inline-block;
      }
      button {
        text-decoration: none;
        border: none;
        cursor: pointer;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        background: var(--c-orange-700, #ff6200);
        color: var(--c-white-100, #ffffff);
        transition: all 0.2s linear;
      }

      ::slotted(*) {
        transition: all 0.2s linear;
      }

      .primary ::slotted(*) {
        color: var(--c-white-100, #ffffff);
      }

      .primary:hover {
        background: var(--c-orange-300, #ffba8f);
        color: var(--c-gray-300);
        ::slotted(*) {
          color: var(--c-gray-300);
        }
      }

      .link {
        background: none;
        border-radius: 0;
        padding: 0;
        color: var(--c-orange-700, #ff6200);
      }

      .link:hover {
        color: var(--c-gray-400);
        ::slotted(*) {
          color: var(--c-gray-400);
        }
      }

      button:disabled:hover,
      button:disabled {
        background: var(--c-white-400, #f8f8f8);
        color: var(--c-gray-600);
        cursor: not-allowed;
      }
    `,
  ];

  render() {
    return html`
      <button
        type=${this.type === 'submit' ? 'submit' : 'button'}
        class="${this.variant}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        <slot></slot>
      </button>
    `;
  }

  _handleClick() {
    if (!this.disabled) {
      if (this.type === 'submit') {
        this.dispatchEvent(
          new Event('submit', {bubbles: true, composed: true})
        );
      } else {
        this.dispatchEvent(
          new Event('button-click', {bubbles: true, composed: true})
        );
      }
    }
  }
}

customElements.define('v-button', Button);
