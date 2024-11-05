import {ConfirmationPopup} from '../src/components/molecules/confirmation-popup.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-confirmation-popup', () => {
  const mockTranslations = {
    confirmation: 'Confirmation',
    confirm: 'Confirm',
    cancel: 'Cancel',
  };

  test('is defined', () => {
    const el = document.createElement('v-confirmation-popup');
    assert.instanceOf(el, ConfirmationPopup);
  });

  test('renders with default properties', async () => {
    const el = await fixture(
      html`<v-confirmation-popup
        .translations=${mockTranslations}
      ></v-confirmation-popup>`
    );
    const header = el.shadowRoot.querySelector('.popup-header h3');
    assert.equal(header.textContent.trim(), 'Confirmation');
    const confirmButton = el.shadowRoot.querySelectorAll('v-button')[0];
    const cancelButton = el.shadowRoot.querySelectorAll('v-button')[1];
    assert.equal(confirmButton.textContent.trim(), 'Confirm');
    assert.equal(cancelButton.textContent.trim(), 'Cancel');
  });

  test('displays custom message', async () => {
    const el = await fixture(
      html`<v-confirmation-popup
        .message=${'Are you sure?'}
        .translations=${mockTranslations}
      ></v-confirmation-popup>`
    );
    const messageParagraph = el.shadowRoot.querySelector('p');
    assert.equal(messageParagraph.textContent.trim(), 'Are you sure?');
  });

  test('dispatches confirm event when confirm button is clicked', async () => {
    const el = await fixture(
      html`<v-confirmation-popup
        .translations=${mockTranslations}
      ></v-confirmation-popup>`
    );
    setTimeout(() => {
      const confirmButton = el.shadowRoot.querySelectorAll('v-button')[0];
      confirmButton.click();
    });
    const event = await oneEvent(el, 'confirm');
    assert.exists(event);
  });

  test('closes when cancel button is clicked', async () => {
    const el = await fixture(
      html`<v-confirmation-popup
        .translations=${mockTranslations}
      ></v-confirmation-popup>`
    );
    const parent = el.parentNode;
    const cancelButton = el.shadowRoot.querySelectorAll('v-button')[1];
    cancelButton.click();
    await el.updateComplete;
    assert.isFalse(parent.contains(el));
  });

  test('closes when overlay is clicked', async () => {
    const el = await fixture(
      html`<v-confirmation-popup
        .translations=${mockTranslations}
      ></v-confirmation-popup>`
    );
    const parent = el.parentNode;
    const overlay = el.shadowRoot.querySelector('.popup-overlay');
    overlay.click();
    await el.updateComplete;
    assert.isFalse(parent.contains(el));
  });
});
