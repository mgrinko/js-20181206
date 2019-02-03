import Base from './base.js';

export default class Filter extends Base{
  constructor({ element }) {
      super({ element });

      this._typeSorting = [
          {
              title:'Новизна',
              sortField:'age',
          },
          {
              title:'Алфавит',
              sortField:'name',
          }
      ];

      this._render();


      this._searchInput = this._element.querySelector('.js-search_input');
      this._sortableOptions = this._element.querySelector('.js-sortable_options');

        this.on('input','.js-search_input, .js-sortable_options','filter-catalog');
      //this._searchInput.addEventListener('input', this.debounce(this._onSort, 300));
      //this._sortableOptions.addEventListener('input', this._onSort);

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
          ${ this._typeSorting.map(type=>`
            <option value="${ type.sortField }">${ type.title }</option>
          `).join('') }
        </select>
      </p>
    `;
  }

}
