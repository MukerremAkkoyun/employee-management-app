import {EmployeeHeader} from '../src/components/organisms/header.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {Router} from '@vaadin/router';

suite('v-header', () => {
  const mockTranslations = {
    employeeList: 'Employee List',
    addEmployee: 'Add Employee',
  };

  test('is defined', () => {
    const el = document.createElement('v-header');
    assert.instanceOf(el, EmployeeHeader);
  });

  test('renders with default properties', async () => {
    const el = await fixture(
      html`<v-header .translations=${mockTranslations}></v-header>`
    );
    const buttons = el.shadowRoot.querySelectorAll('v-button');
    assert.equal(buttons.length, 5); // Logo, Employee List, Add Employee, Language Switcher TR, Language Switcher EN
    const employeeListButton = buttons[1];
    const addEmployeeButton = buttons[2];
    assert.include(employeeListButton.textContent.trim(), 'Employee List');
    assert.include(addEmployeeButton.textContent.trim(), 'Add Employee');
  });

  test('navigates to employee list on button click', async () => {
    const el = await fixture(
      html`<v-header .translations=${mockTranslations}></v-header>`
    );
    const employeeListButton = el.shadowRoot.querySelectorAll('v-button')[1];
    let routeChanged = false;
    const originalGo = Router.go;
    Router.go = (path) => {
      if (path === '/employees') {
        routeChanged = true;
      }
    };
    employeeListButton.click();
    assert.isTrue(routeChanged);
    Router.go = originalGo; // Restore original function
  });
});
