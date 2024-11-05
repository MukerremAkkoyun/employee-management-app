import {ViewSwitcher} from '../src/components/molecules/view-switcher.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-view-switcher', () => {
  test('is defined', () => {
    const el = document.createElement('v-view-switcher');
    assert.instanceOf(el, ViewSwitcher);
  });

  test('renders with default viewMode', async () => {
    const el = await fixture(html`<v-view-switcher></v-view-switcher>`);
    assert.equal(el.viewMode, 'table');
  });

  test('switches to list view and dispatches event', async () => {
    const el = await fixture(html`<v-view-switcher></v-view-switcher>`);
    setTimeout(() => {
      const listButton = el.shadowRoot.querySelector('v-button');
      listButton.click();
    });
    const event = await oneEvent(el, 'view-mode-change');
    assert.equal(el.viewMode, 'list');
    assert.equal(event.detail.viewMode, 'list');
  });

  test('switches to table view and dispatches event', async () => {
    const el = await fixture(
      html`<v-view-switcher .viewMode=${'list'}></v-view-switcher>`
    );
    setTimeout(() => {
      const buttons = el.shadowRoot.querySelectorAll('v-button');
      const tableButton = buttons[1];
      tableButton.click();
    });
    const event = await oneEvent(el, 'view-mode-change');
    assert.equal(el.viewMode, 'table');
    assert.equal(event.detail.viewMode, 'table');
  });

  test('does not dispatch event if viewMode is the same', async () => {
    const el = await fixture(html`<v-view-switcher></v-view-switcher>`);
    let eventDispatched = false;
    el.addEventListener('view-mode-change', () => {
      eventDispatched = true;
    });
    const tableButton = el.shadowRoot.querySelectorAll('v-button')[1];
    tableButton.click();
    await el.updateComplete;
    assert.isFalse(eventDispatched);
  });
});
