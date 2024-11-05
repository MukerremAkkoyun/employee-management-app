import {LitElement, html, css} from 'lit';
import {getTranslation} from '../../i18n/index.js';
import {Constants} from '../../styles/_constants.js';
import store from '../../store/index.js';

export class ConfirmationPopup extends LitElement {
  static properties = {
    message: {type: String},
    confirmText: {type: String},
    cancelText: {type: String},
    translations: {type: Object},
  };

  constructor() {
    super();
    this.message = '';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
    this.translations = store.getState().translations;
  }

  confirm() {
    this.dispatchEvent(
      new CustomEvent('confirm', {bubbles: true, composed: true})
    );
    this.close();
  }

  close() {
    this.remove();
  }

  render() {
    return html`
      <div class="popup-overlay" @click="${this.close}">
        <div class="popup-content" @click="${(e) => e.stopPropagation()}">
          <div class="popup-header">
            <h3>${getTranslation(this.translations, 'confirmation')}</h3>
            <span class="close-icon" @click="${this.close}">&times;</span>
          </div>
          <p>${this.message}</p>
          <div class="popup-v-buttons">
            <v-button @click="${this.confirm}">
              ${this.confirmText ||
              getTranslation(this.translations, 'confirm')}
            </v-button>
            <v-button @click="${this.close}">
              ${this.cancelText || getTranslation(this.translations, 'cancel')}
            </v-button>
          </div>
        </div>
      </div>
    `;
  }
  static styles = [
    Constants,
    css`
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .popup-content {
        background: white;
        padding: 1.25rem;
        border-radius: 0.25rem;
        width: 18rem;
        text-align: center;
      }

      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .close-icon {
        cursor: pointer;
        font-size: 2em;
      }

      /* Responsive styles */
      :host(.mobile) .popup-content {
        width: 90%;
        padding: 1rem;
      }
    `,
  ];
}

customElements.define('v-confirmation-popup', ConfirmationPopup);
