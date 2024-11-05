import {LitElement, html} from 'lit';
import {ViewportController} from '../controllers/viewport.js';
import store from '../store/index.js';

class Layout extends LitElement {
  static properties = {
    translations: {type: Object},
    viewportClass: {type: String},
  };

  constructor() {
    super();
    this.translations = [];
    this.viewportController = new ViewportController(this);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.translations = store.getState().translations;
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('viewportClass')) {
      this.classList.toggle(
        'mobile',
        this.viewportController.viewportClass === 'mobile'
      );
      this.classList.toggle(
        'tablet',
        this.viewportController.viewportClass === 'tablet'
      );
    }
  }

  render() {
    return html`
      <section>
        <v-header class="${this.viewportController.viewportClass}"></v-header>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define('v-layout', Layout);
