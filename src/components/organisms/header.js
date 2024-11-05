import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';

import {
  getTranslation,
  getInitialLang,
  changeLanguage,
} from '../../i18n/index.js';
import store from '../../store/index.js';

export class EmployeeHeader extends LitElement {
  static properties = {
    lang: {type: String},
    translations: {type: Object},
  };

  constructor() {
    super();
    this.lang = getInitialLang();
    this.translations = [];

    store.subscribe(() => {
      this.translations = store.getState().translations;
    });
  }

  render() {
    return html`
      <header class="header">
        <div class="logo">
          <v-button variant="link" @click="${() => Router.go('/')}">
            <icon-logo size="23px"><span slot="text">Logo</span></icon-logo>
          </v-button>
        </div>

        <nav class="nav-bar">
          <v-button variant="link" @click="${() => Router.go('/employees')}">
            <icon-employees size="24px">
              <span slot="text"
                >${getTranslation(this.translations, 'employeeList')}</span
              >
            </icon-employees>
          </v-button>

          <v-button variant="link" @click="${() => Router.go('/add')}">
            <icon-plus size="24px">
              <span slot="text"
                >${getTranslation(this.translations, 'addEmployee')}</span
              >
            </icon-plus>
          </v-button>

          <v-button variant="link" @click="${() => changeLanguage('tr')}">
            <icon-tr-flag size="24px"></icon-tr-flag>
          </v-button>
          <v-button variant="link" @click="${() => changeLanguage('en')}">
            <icon-uk-flag size="24px"></icon-uk-flag>
          </v-button>
        </nav>
      </header>
    `;
  }

  static styles = css`
    header {
      background-color: var(--c-white-100, #ffffff);
      padding: 1rem 1.5rem;
      margin: 0 2rem;
      border-bottom: 1px solid var(--c-white-500, #dddddd);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.2em;
    }

    .nav-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Responsive styles */
    :host(.mobile) header {
      margin: 0 1rem;
    }

    :host(.viewport-extra-small) header {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin: 0;
      gap: 1rem;
    }

    :host(.viewport-extra-small) .nav-bar {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
  `;
}

customElements.define('v-header', EmployeeHeader);
