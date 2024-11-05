import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {getTranslation} from '../../i18n/index.js';
import {repeat} from 'lit/directives/repeat.js';

export class EmployeeTable extends LitElement {
  static properties = {
    employees: {type: Array},
    viewMode: {type: String},
    translations: {type: Object},
  };

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'table';
    this.translations = {
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfEmployment: 'Date of Employment',
      dateOfBirth: 'Date of Birth',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      actions: 'Actions',
      noResults: 'No results found',
    };
  }

  render() {
    return html`
      <table
        class="employee-table ${classMap({
          'list-mode': this.viewMode === 'list',
          'table-mode': this.viewMode === 'table',
        })}"
      >
        <thead>
          <tr>
            <th><input type="checkbox" name="checkbox" /></th>
            <th>${getTranslation(this.translations, 'firstName')}</th>
            <th>${getTranslation(this.translations, 'lastName')}</th>
            <th class="w-alignment">
              ${getTranslation(this.translations, 'dateOfEmployment')}
            </th>
            <th class="w-alignment">
              ${getTranslation(this.translations, 'dateOfBirth')}
            </th>
            <th>${getTranslation(this.translations, 'phone')}</th>
            <th>${getTranslation(this.translations, 'email')}</th>
            <th>${getTranslation(this.translations, 'department')}</th>
            <th>${getTranslation(this.translations, 'position')}</th>
            <th>${getTranslation(this.translations, 'actions')}</th>
          </tr>
        </thead>
        ${this.employees.length > 0
          ? html`
              <tbody>
                ${repeat(
                  this.employees,
                  (employee) => employee.id,
                  (employee) => this.renderEmployeeRow(employee)
                )}
              </tbody>
            `
          : ''}
      </table>
      ${this.employees.length === 0
        ? html`<div class="no-results">
            ${getTranslation(this.translations, 'noResults')}
          </div>`
        : ''}
    `;
  }

  renderEmployeeRow(employee) {
    return html`
      <tr>
        <td><input type="checkbox" name="checkbox" /></td>
        <td class="bold">${employee.firstName}</td>
        <td class="bold">${employee.lastName}</td>
        <td class="w-alignment">${employee.dateOfEmployment}</td>
        <td class="w-alignment">${employee.dateOfBirth}</td>
        <td>${employee.phone}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td>${employee.position}</td>
        <td class="actions">
          <v-button
            variant="link"
            @click="${() => this._editEmployee(employee.id)}"
          >
            <icon-edit size="20px"></icon-edit>
          </v-button>
          <v-button
            variant="link"
            @click="${() => this._deleteEmployee(employee)}"
          >
            <icon-trash size="20px"></icon-trash>
          </v-button>
        </td>
      </tr>
    `;
  }

  _editEmployee(id) {
    this.dispatchEvent(
      new CustomEvent('edit-employee', {
        detail: {id},
        bubbles: true,
        composed: true,
      })
    );
  }

  _deleteEmployee(employee) {
    this.dispatchEvent(
      new CustomEvent('delete-employee', {
        detail: {employee},
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--c-white-100, #ffffff);
      font-size: 0.9rem;
      border-radius: 0.25rem;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      min-width: 62.5rem;
    }

    th,
    td {
      text-align: left;
      border-bottom: 1px solid var(--c-white-500, #dddddd);
      height: 3rem;
    }

    th {
      background-color: #f8f8f8;
      color: #ff7a00;
      font-weight: normal;
    }

    th:nth-child(1),
    td:nth-child(1) {
      width: 3rem;
      padding: 0;
      text-align: center;
    }

    tbody tr:hover {
      background-color: var(--c-white-200, #f1f1f1);
    }

    tbody tr td {
      color: var(--c-gray-500);
      line-height: 1;
    }

    tbody tr td.bold {
      color: var(--c-gray-200, #151921);
    }

    tbody tr td.w-alignment {
      width: 7rem;
    }

    .actions v-button {
      color: #ff7a00;
    }

    .actions v-button:hover {
      color: #e74c3c;
    }

    .no-results {
      background: white;
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--c-white-500, #dddddd);
    }

    .list-mode th,
    .list-mode td {
      height: 2rem;
    }

    .list-mode {
      background: var(--c-orange-300, #ffba8f);
    }
  `;
}

customElements.define('v-employee-table', EmployeeTable);
