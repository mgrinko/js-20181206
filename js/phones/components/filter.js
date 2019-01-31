import Components from './components.js';

export default class Filter extends Components{
  constructor({ element, onSort }) {
      super();
      this._element = element;
      this._onSort = onSort;

      this._render();

      this._searchInput = this._element.querySelector('.js-search_input');
      this._sortableOptions = this._element.querySelector('.js-sortable_options');


      this._searchInput.addEventListener('input', this._debounce(this._onSort, 300));
      this._sortableOptions.addEventListener('input', this._onSort);

  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input type="text" class="js-search_input" placeholder="search">
      </p>

      <p>
        Sort by:
        <select class="js-sortable_options">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }

}
