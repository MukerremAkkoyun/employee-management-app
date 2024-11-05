import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import store from '../store/index.js';
import {addEmployee, updateEmployee} from '../store/employee-slice.js';
import {getTranslation} from '../i18n/index.js';
import {Constants} from '../styles/_constants.js';

class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    isEditMode: {type: Boolean},
    translations: {type: Object},
    errors: {type: Object},
    hasChanges: {type: Boolean},
  };

  constructor() {
    super();
    this.employee = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.positions = ['Junior', 'Medior', 'Senior'];
    this.departments = ['Analytics', 'Tech'];
    this.errors = {};
    this.isEditMode = false;
    this.translations = store.getState().translations;
    this.hasChanges = false;
  }

  async connectedCallback() {
    super.connectedCallback();

    const url = new URL(window.location.href);
    const id = url.pathname.split('/').pop();
    if (id !== 'add') {
      this.isEditMode = true;
      const employees = store.getState().employees;
      this.employee = employees.find((emp) => emp.id === id) || this.employee;
    }
  }

  validateEmployeeForm(employee) {
    const errors = {};
    const requiredMessage = this.translations.requiredField;

    if (!employee.firstName) errors.firstName = requiredMessage;
    if (!employee.lastName) errors.lastName = requiredMessage;
    if (!employee.email) errors.email = requiredMessage;
    if (!employee.phone) errors.phone = requiredMessage;
    if (!employee.position) errors.position = requiredMessage;
    if (!employee.dateOfEmployment) errors.dateOfEmployment = requiredMessage;
    if (!employee.dateOfBirth) errors.dateOfBirth = requiredMessage;
    if (!employee.department) errors.department = requiredMessage;

    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = this.validateEmployeeForm(this.employee);
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return; // Stop submission if there are errors
    }

    if (this.isEditMode) {
      const popup = document.createElement('v-confirmation-popup');

      const _employee = `${this.employee.firstName} ${this.employee.lastName}`;

      popup.message = getTranslation(
        this.translations,
        'confirmUpdate'
      ).replace('{{name}}', _employee);

      popup.confirmText = getTranslation(this.translations, 'confirm');
      popup.cancelText = getTranslation(this.translations, 'cancel');

      // Listen for the 'confirm' event
      popup.addEventListener('confirm', () => {
        store.dispatch(updateEmployee(this.employee));
        Router.go('/');
      });

      document.body.appendChild(popup);
    } else {
      store.dispatch(addEmployee(this.employee));
      Router.go('/');
    }
  }

  formatDateForInput(dateStr) {
    // Convert from dd/MM/yyyy to yyyy-MM-dd for input compatibility
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }

  formatDateForStorage(dateStr) {
    // Convert from yyyy-MM-dd back to dd/MM/yyyy for storage
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  updateField(event, field) {
    const value = event.target.value;
    if (field === 'dateOfBirth' || field === 'dateOfEmployment') {
      // Convert the input value to the required storage format
      this.employee = {
        ...this.employee,
        [field]: this.formatDateForStorage(value),
      };
    } else {
      this.employee = {...this.employee, [field]: value};
    }
    this.errors = {...this.errors, [field]: ''};
    this.hasChanges = true;
  }

  render() {
    return html`
    <main class="main-section">
      <section class="container">
        <div class="top-bar">
          <h2 class="view-title">
           ${
             this.isEditMode
               ? getTranslation(this.translations, 'editEmployee')
               : getTranslation(this.translations, 'addEmployee')
           }
          </h2>
          </div>
          <form @submit="${this.handleSubmit}">
            <label>
              ${getTranslation(this.translations, 'firstName')}:
              <input
                type="text"
                name="first-name"
                .value="${this.employee.firstName}"
                @input="${(e) => this.updateField(e, 'firstName')}"
                class="${this.errors.firstName ? 'error' : ''}"
              />
              ${
                this.errors.firstName
                  ? html`<span class="error-message"
                      >${this.errors.firstName}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'lastName')}:
              <input
                type="text"
                name="last-name"
                .value="${this.employee.lastName}"
                @input="${(e) => this.updateField(e, 'lastName')}"
                class="${this.errors.lastName ? 'error' : ''}"
              />
              ${
                this.errors.lastName
                  ? html`<span class="error-message"
                      >${this.errors.lastName}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'dateOfEmployment')}:
              <input
                type="date"
                name="date-employment"
                .value="${this.formatDateForInput(
                  this.employee.dateOfEmployment
                )}"
                @input="${(e) => this.updateField(e, 'dateOfEmployment')}"
                class="${this.errors.dateOfEmployment ? 'error' : ''}"
              />
              ${
                this.errors.dateOfEmployment
                  ? html`<span class="error-message"
                      >${this.errors.dateOfEmployment}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'dateOfBirth')}:
              <input
                type="date"
                name="date-birth"
                .value="${this.formatDateForInput(this.employee.dateOfBirth)}"
                @input="${(e) => this.updateField(e, 'dateOfBirth')}"
                class="${this.errors.dateOfBirth ? 'error' : ''}"
              />
              ${
                this.errors.dateOfBirth
                  ? html`<span class="error-message"
                      >${this.errors.dateOfBirth}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'phone')}:
              <input
                type="tel"
                name="phone"
                .value="${this.employee.phone}"
                @input="${(e) => this.updateField(e, 'phone')}"
                class="${this.errors.phone ? 'error' : ''}"
              />
              ${
                this.errors.phone
                  ? html`<span class="error-message"
                      >${this.errors.phone}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'email')}:
              <input
                type="email"
                name="email"
                .value="${this.employee.email}"
                @input="${(e) => this.updateField(e, 'email')}"
                class="${this.errors.email ? 'error' : ''}"
              />
              ${
                this.errors.email
                  ? html`<span class="error-message"
                      >${this.errors.email}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'department')}:
              <select
                name="department"
                @change="${(e) => this.updateField(e, 'department')}"
                class="${this.errors.department ? 'error' : ''}"
              >
                <option value="">
                  ${getTranslation(this.translations, 'pleaseSelect')}
                </option>

                ${this.departments.map(
                  (department) => html`
                    <option
                      value="${department}"
                      ?selected="${this.employee.department === department}"
                    >
                      ${department}
                    </option>
                  `
                )}
              </select>
              ${
                this.errors.department
                  ? html`<span class="error-message"
                      >${this.errors.department}</span
                    >`
                  : ''
              }
            </label>

            <label>
              ${getTranslation(this.translations, 'position')}:
              <select
                name="position"
                @change="${(e) => this.updateField(e, 'position')}"
                class="${this.errors.position ? 'error' : ''}"
              >
                <option value="">
                  ${getTranslation(this.translations, 'pleaseSelect')}
                </option>
                ${this.positions.map(
                  (position) => html`
                    <option
                      value="${position}"
                      ?selected="${this.employee.position === position}"
                    >
                      ${position}
                    </option>
                  `
                )}
              </select>
              ${
                this.errors.position
                  ? html`<span class="error-message"
                      >${this.errors.position}</span
                    >`
                  : ''
              }
            </label>

           <div class="button-cover">
            <button type="submit" ?disabled="${!this.hasChanges}">
              ${
                this.isEditMode
                  ? getTranslation(this.translations, 'update')
                  : getTranslation(this.translations, 'addEmployee')
              }
            </button>
            <v-button type="button" @click="${() => Router.go('/')}">
              ${getTranslation(this.translations, 'cancel')}
            </v-button>
            </div>
          </form>
        </div>
      </section>
    </main>
    `;
  }

  static styles = [
    Constants,
    css`
      :host {
        display: flex;
        margin: 0 1rem;
        padding: 1rem;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        padding: 2rem 0;
      }

      .view-title {
        margin: 0;
        color: var(--c-orange-700, #ff6200);
      }

      form {
        display: flex;
        width: 100%;
        gap: 0.25rem;
        flex-direction: column;
        padding: 1rem;
        max-width: 37.5rem;
        background: var(--c-white-100, #ffffff);
        border-radius: 0.25rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        margin-top: 1rem;
      }
      .error {
        border: 1px solid red;
      }
      .error-message {
        color: red;
        font-size: 0.875em;
        display: block;
        padding-top: 0.25rem;
      }
      form label {
        display: block;
        margin: 0.875em;
        color: var(--c-orange-700, #ff6200);
      }

      input,
      select {
        padding: 0.5rem 0.5rem;
        border: 1px solid var(--c-gray-600, #999999);
        border-radius: 0.25rem;
        width: 100%;
        margin-top: 0.5rem;
        box-sizing: border-box;
      }

      .button-cover {
        display: flex;
        margin: 0 1rem;
        gap: 1rem;
      }

      button {
        text-decoration: none;
        border: none;
        cursor: pointer;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        transition: all 0.2s linear;
      }
      button:not(:disabled) {
        background: var(--c-orange-700, #ff6200);
        color: var(--c-white-100, #ffffff);
      }

      button:not(:disabled):hover {
        background: var(--c-orange-300, #ffba8f);
        color: var(--c-gray-300);
      }

      main {
        width: 100%;
        background: var(--c-white-400, #f8f8f8);
        margin: 0 2rem;
      }

      /* Responsive styles */
      :host(.mobile),
      :host(.tablet) {
        padding: 0;
      }

      :host(.tablet) main,
      :host(.mobile) main {
        margin: 0;
      }
    `,
  ];
}

customElements.define('v-employee-form', EmployeeForm);
