import {Pagination} from '../src/components/molecules/pagination.js';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('v-pagination', () => {
  const mockTranslations = {
    first: 'First',
    previous: 'Previous',
    next: 'Next',
    last: 'Last',
    page: 'Page',
    pageOf: 'of',
  };

  test('is defined', () => {
    const el = document.createElement('v-pagination');
    assert.instanceOf(el, Pagination);
  });

  test('renders with default properties', async () => {
    const el = await fixture(
      html`<v-pagination
        .currentPage=${1}
        .totalPages=${10}
        .translations=${mockTranslations}
      ></v-pagination>`
    );
    assert.shadowDom.equal(
      el,
      `
      <div class="pagination">
        <v-button class="first" disabled="">
          First
        </v-button>
        <v-button class="previous" disabled="">
          Previous
        </v-button>
        <span>
          <span class="page">Page</span>
          1 of 10
        </span>
        <v-button class="next">
          Next
        </v-button>
        <v-button class="last">
          Last
        </v-button>
      </div>
      `
    );
  });

  test('disables next and last buttons on last page', async () => {
    const el = await fixture(
      html`<v-pagination
        .currentPage=${10}
        .totalPages=${10}
        .translations=${mockTranslations}
      ></v-pagination>`
    );
    const nextButton = el.shadowRoot.querySelector('.next');
    const lastButton = el.shadowRoot.querySelector('.last');
    assert.isTrue(nextButton.hasAttribute('disabled'));
    assert.isTrue(lastButton.hasAttribute('disabled'));
  });

  test('dispatches page-change event when next button is clicked', async () => {
    const el = await fixture(
      html`<v-pagination
        .currentPage=${1}
        .totalPages=${10}
        .translations=${mockTranslations}
      ></v-pagination>`
    );
    setTimeout(() => {
      const nextButton = el.shadowRoot.querySelector('.next');
      nextButton.click();
    });
    const event = await oneEvent(el, 'page-change');
    assert.equal(event.detail.page, 2);
  });

  test('does not dispatch page-change event when on first page and previous is clicked', async () => {
    const el = await fixture(
      html`<v-pagination
        .currentPage=${1}
        .totalPages=${10}
        .translations=${mockTranslations}
      ></v-pagination>`
    );
    const previousButton = el.shadowRoot.querySelector('.previous');
    assert.isTrue(previousButton.hasAttribute('disabled'));
  });
});
