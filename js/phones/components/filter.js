'use strict';

import Helper from '../../helper.js';
import Component from '../../component.js';

export default class Filter extends Component {
  constructor({ element }) {
    super({ element })
    this.sortBy = 'age';
    this.SEARCH_DELAY = 500;
    this.queryString = '';
    this._render();

    this.on('input', 'search', Helper.debounce((event) => {
      let queryString = event.target.value;
      this.queryString = queryString;
      this.emit('query-changed', { queryString, sortBy: this.sortBy });
    }, this.SEARCH_DELAY));

    this.on('change', 'sort', (event) => {
      let sortBy = event.target.value;
      this.sortBy = sortBy;
      this.emit('sort-changed', { queryString: this.queryString, sortBy });
    });

  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="search">
      </p>
      <p>
        Sort by:
        <select data-element="sort">
          <option value="name">Alphabetical</option>
          <option selected value="age">Newest</option>
        </select>
      </p>
    `;
  }
}