export default class Filter {
  constructor({ element, onSearch, onSort }) {
    this._element = element;
    this._onSearch = onSearch;
    this._onSort = onSort;
    this._render();
    this._initEventHandlers();
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input type="search" name="search">
      </p>

      <p>
        Sort by:
        <select name="sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
  _initEventHandlers() {
    const search = debounce((e) => {
      if (e.target.closest('[name="search"]')) {
        this._onSearch(e.target.closest('[name="search"]').value);
      }
    }, 300)

    this._element.addEventListener('input', search);

    this._element.addEventListener('change', (e) => {
      if (e.target.closest('[name="sort"]')) {
        this._onSort(e.target.closest('[name="sort"]').value);
      }
    });
  }
}

function debounce(f, delay) {
  let timer = null;
  return function wrapper(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      return f.apply(this, args);
    }, delay);
  }
}
