// test/employee-table_test.js

import {EmployeeTable} from '../src/components/molecules/employee-table.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-employee-table', () => {
  const mockTranslations = {
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

  test('is defined', () => {
    const el = document.createElement('v-employee-table');
    assert.instanceOf(el, EmployeeTable);
  });

  test('renders with default properties', async () => {
    const el = await fixture(html`<v-employee-table></v-employee-table>`);
    // Since default values are set in the component, no need to pass properties
    assert.shadowDom.equal(
      el,
      `
      <table class="employee-table table-mode">
        <thead>
          <tr>
            <th><input type="checkbox" name="checkbox"></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th class="w-alignment">Date of Employment</th>
            <th class="w-alignment">Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="no-results">No results found</div>
      `
    );
  });

  test('renders "no results" when employees array is empty', async () => {
    const el = await fixture(
      html`<v-employee-table
        .employees=${[]}
        .translations=${mockTranslations}
      ></v-employee-table>`
    );
    const noResultsDiv = el.shadowRoot.querySelector('.no-results');
    assert.exists(noResultsDiv);
    assert.equal(noResultsDiv.textContent.trim(), 'No results found');
  });

  test('renders employees when employees array is set', async () => {
    const employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer',
      },
    ];
    const el = await fixture(
      html`<v-employee-table
        .employees=${employees}
        .translations=${mockTranslations}
      ></v-employee-table>`
    );
    const tbody = el.shadowRoot.querySelector('tbody');
    assert.exists(tbody);
    const rows = tbody.querySelectorAll('tr');
    assert.equal(rows.length, 1);
    const firstRowCells = rows[0].querySelectorAll('td');
    assert.equal(firstRowCells[1].textContent.trim(), 'John');
    assert.equal(firstRowCells[2].textContent.trim(), 'Doe');
  });

  test('applies correct class based on viewMode', async () => {
    const el = await fixture(
      html`<v-employee-table
        .employees=${[]}
        .viewMode=${'list'}
        .translations=${mockTranslations}
      ></v-employee-table>`
    );
    const table = el.shadowRoot.querySelector('table');
    assert.isTrue(table.classList.contains('list-mode'));
    assert.isFalse(table.classList.contains('table-mode'));
  });

  test('dispatches edit-employee event when edit button is clicked', async () => {
    const employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer',
      },
    ];
    const el = await fixture(
      html`<v-employee-table
        .employees=${employees}
        .translations=${mockTranslations}
      ></v-employee-table>`
    );
    setTimeout(() => {
      const editButton = el.shadowRoot.querySelector('.actions v-button');
      editButton.click();
    });
    const event = await oneEvent(el, 'edit-employee');
    assert.equal(event.detail.id, 1);
  });

  test('dispatches delete-employee event when delete button is clicked', async () => {
    const employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer',
      },
    ];
    const el = await fixture(
      html`<v-employee-table
        .employees=${employees}
        .translations=${mockTranslations}
      ></v-employee-table>`
    );
    setTimeout(() => {
      const deleteButton =
        el.shadowRoot.querySelectorAll('.actions v-button')[1];
      deleteButton.click();
    });
    const event = await oneEvent(el, 'delete-employee');
    assert.deepEqual(event.detail.employee, employees[0]);
  });
});
