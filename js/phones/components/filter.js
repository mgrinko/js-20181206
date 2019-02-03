'use strict';

import Helper from '../../helper.js';
import Component from '../../component.js';

export default class Filter extends Component {
  constructor({ element }) {
    super({ element })
    this.sortBy = 'age';
    this.queryString = '';
    this._render();

    this.on('input', 'search', Helper.debounce((event) => {
      let queryString = event.target.value;
      this.queryString = queryString;
      this.emit('search-select', { queryString, sortBy: this.sortBy });
    }, 300));

    this.on('change', 'sort', (event) => {
      let sortBy = event.target.value;
      this.sortBy = sortBy;
      this.emit('sort-select', { queryString: this.queryString, sortBy });
    });

  }

  search() {

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