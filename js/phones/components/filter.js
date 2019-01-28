export default class Filter {
  constructor({ element, onSort }) {
      this._element = element;
      this._onSort = onSort;

      this._render();

      this._search_input = this._element.querySelector('.js-search_input');
      this._sortable_options = this._element.querySelector('.js-sortable_options');


      this._search_input.addEventListener('input', this.debounce(this._onSort, 300));
      this._sortable_options.addEventListener('change', this._onSort);

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

  debounce(f, delay){
      let timer = null;


      return function(...args){
          //при повторном запуске очищаем и запускаем таймер по новой
          clearTimeout(timer);
          timer = setTimeout(()=>{
              f.apply(this,args);
          },delay);

      }
  }
}
