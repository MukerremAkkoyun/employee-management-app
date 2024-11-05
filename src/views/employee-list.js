import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {ViewportController} from '../controllers/viewport.js';
import {deleteEmployee} from '../store/employee-slice.js';
import {getTranslation} from '../i18n/index.js';
import {Constants} from '../styles/_constants.js';
import store from '../store/index.js';

class EmployeeList extends LitElement {
  static properties = {
    viewportClass: {type: String},
    employees: {type: Array},
    searchQuery: {type: String},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    viewMode: {type: String},
    translations: {type: Object},
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.viewMode = 'table';
    this.employees = store.getState().employees;
    this.translations = store.getState().translations;
    this.viewportController = new ViewportController(this);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.employees = store.getState().employees;
      this.translations = store.getState().translations;
    });
  }

  disconnectedCallback() {
    this.unsubscribe();
    super.disconnectedCallback();
  }

  updated() {
    // Clear all classes from :host
    this.className = '';

    // Add route class if defined
    if (this.routeClass) {
      this.classList.add(this.routeClass);
    }

    // Add viewport classes, splitting by space to handle multiple classes
    (this.viewportController.viewportClass || '')
      .split(' ')
      .forEach((className) => this.classList.add(className));
  }

  render() {
    return html`
      <main class="main-section">
        <section class="container">
          <div class="top-bar">
            <h2 class="view-title">
              ${getTranslation(this.translations, 'employeeList')}
            </h2>

            <v-view-switcher
              .viewMode="${this.viewMode}"
              @view-mode-change="${this._onViewModeChange}"
            ></v-view-switcher>
          </div>

          <div class="search-bar">
            <v-search-bar
              placeholder="${getTranslation(
                this.translations,
                'searchEmployees'
              )}"
              .value="${this.searchQuery}"
              @search-query-change="${this._updateSearchQuery}"
            ></v-search-bar>
          </div>

          <div class="list-container">
            <v-employee-table
              .employees="${this.getPaginatedEmployees()}"
              .viewMode="${this.viewMode}"
              .translations="${this.translations}"
              @edit-employee="${this._onEditEmployee}"
              @delete-employee="${this._onDeleteEmployee}"
            ></v-employee-table>
          </div>

          ${this.getTotalPages() > 1
            ? html`
                <v-pagination
                  .translations="${this.translations}"
                  .currentPage="${this.currentPage}"
                  .totalPages="${this.getTotalPages()}"
                  @page-change="${this._onPageChange}"
                ></v-pagination>
              `
            : ''}
        </section>
      </main>
    `;
  }

  _onViewModeChange(event) {
    this.viewMode = event.detail.viewMode;
    this.itemsPerPage = this.viewMode === 'table' ? 9 : 16;
    this.currentPage = 1;
  }

  _updateSearchQuery(event) {
    this.searchQuery = event.detail.query;
    this.currentPage = 1;
  }

  _onEditEmployee(event) {
    const id = event.detail.id;
    Router.go(`/edit/${id}`);
  }

  _onDeleteEmployee(event) {
    const employee = event.detail.employee;
    this.confirmDelete(employee);
  }

  _onPageChange(event) {
    const newPage = event.detail.page;
    this.currentPage = newPage;
  }

  confirmDelete(employee) {
    const popup = document.createElement('v-confirmation-popup');
    const _employee = `${employee.firstName} ${employee.lastName}`;
    popup.message = getTranslation(this.translations, 'confirmDelete').replace(
      '{{name}}',
      _employee
    );

    popup.confirmText = getTranslation(this.translations, 'confirm');
    popup.cancelText = getTranslation(this.translations, 'cancel');

    // Listen for the 'confirm' event
    popup.addEventListener('confirm', () => {
      store.dispatch(deleteEmployee(employee.id));
      this.employees = store.getState().employees;
    });

    document.body.appendChild(popup);
  }

  getPaginatedEmployees() {
    const filteredEmployees = this.employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return filteredEmployees.slice(start, end);
  }

  getTotalPages() {
    const filteredEmployees = this.employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
    return Math.ceil(filteredEmployees.length / this.itemsPerPage);
  }

  static styles = [
    Constants,
    css`
      :host {
        display: block;
        margin: 0 1rem;
        padding: 1rem;
      }

      .container {
        padding-top: 1rem;
      }

      .top-bar {
        display: flex;
        gap: 0.625rem;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: space-between;
      }

      .view-title {
        margin: 0;
        color: var(--c-orange-700, #ff6200);
      }

      .search-bar {
        margin-bottom: 1rem;
      }

      .list-container {
        overflow-y: auto;
      }

      main {
        width: 100%;
        box-sizing: border-box;
        background: var(--c-white-400, #f8f8f8);
        padding: 0 2rem;
      }

      /* Responsive styles */

      :host(.tablet) main,
      :host(.mobile) main {
        padding: 0 1rem;
      }

      :host(.mobile) {
        padding: 0;
      }

      :host(.viewport-extra-small) main {
        padding: 0;
      }

      :host(.viewport-extra-small) .top-bar {
        flex-direction: column;
      }

      :host(.viewport-extra-small) .search-bar {
        display: flex;
        justify-content: center;
      }
    `,
  ];
}

customElements.define('v-employee-list', EmployeeList);
