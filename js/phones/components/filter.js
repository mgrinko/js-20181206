import BaseComponent from './base-component.js';

export default class Filter extends BaseComponent {
  constructor({ element, onSort, onSearch }) {
    super({ element })
    this._onSort = onSort;
    this._onSearch = onSearch;
    this._render();
    this._sorts = {
      name : (phone1, phone2) => phone1.name < phone2.name ? -1 : 1,
      age : (phone1, phone2) =>  phone1.age < phone2.age ? -1 : 1
    }
    this._element.addEventListener('input', (event)=>{

      let searchInput = event.target.closest('[data-search]');
      if(!searchInput) {
        return;
      }
      this._onSearch(searchInput.value);
    });

    this._element.addEventListener('change', (event)=>{
      let sortTypeSelect = event.target.closest('[data-sort-select]');
      if(!sortTypeSelect) {
        return;
      }
      let sortType = sortTypeSelect.value;
      this._onSort(this._sorts[sortType]);
    });
  }
  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-search>
      </p>

      <p>
        Sort by:
        <select placeholder="" data-sort-select>
          <option disabled selected value> -- select sort type -- </option>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
