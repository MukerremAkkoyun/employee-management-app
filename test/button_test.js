import {Button} from '../src/components/atoms/button.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-button', () => {
  test('is defined', () => {
    const el = document.createElement('v-button');
    assert.instanceOf(el, Button);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<v-button>Hello</v-button>`);
    assert.shadowDom.equal(
      el,
      `
       <button class="primary" type="button"><slot></slot></button>
      `
    );
  });
});
