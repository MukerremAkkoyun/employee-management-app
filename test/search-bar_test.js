import {SearchBar} from '../src/components/molecules/search-bar.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-search-bar Component', () => {
  test('is defined', () => {
    const el = document.createElement('v-search-bar');
    assert.instanceOf(el, SearchBar);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<v-search-bar></v-search-bar>`);
    assert.shadowDom.equal(
      el,
      `<input class="search-input" name="search-input" placeholder="" type="text" />`
    );
  });
});
