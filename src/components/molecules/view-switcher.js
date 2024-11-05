import {LitElement, html, css} from 'lit';

export class ViewSwitcher extends LitElement {
  static properties = {
    viewMode: {type: String},
  };

  constructor() {
    super();
    this.viewMode = 'table';
  }

  render() {
    return html`
      <v-button @click="${this._switchToList}">
        <icon-list></icon-list>
      </v-button>
      <v-button @click="${this._switchToTable}">
        <icon-table></icon-table>
      </v-button>
    `;
  }

  _switchToList() {
    if (this.viewMode !== 'list') {
      this.viewMode = 'list';
      this._emitViewModeChange();
    }
  }

  _switchToTable() {
    if (this.viewMode !== 'table') {
      this.viewMode = 'table';
      this._emitViewModeChange();
    }
  }

  _emitViewModeChange() {
    this.dispatchEvent(
      new CustomEvent('view-mode-change', {
        detail: {viewMode: this.viewMode},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    v-button[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
  `;
}

customElements.define('v-view-switcher', ViewSwitcher);
