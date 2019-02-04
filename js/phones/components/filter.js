import Component from "./component.js";


export default class Filter extends Component {
  constructor({ element }) {
    super({element});

    this.on('change', 'select-sort', (event)=>{
      this._sortBy = event.target.value;
      this.emit('change-sort', {sortBy: this._sortBy, query: this._query});
    });

    this.on('input', 'filter', (event)=>{
      this._query = event.target.value;
      this.emit('filter-ready', {sortBy: this._sortBy, query: this._query});
    });

    this._render();
  }

  _debounce(f, delay) {
    return function(...args) {
        //console.log('this при вызове обертки' + this);
        let checkIfUserStoppedInput = function(){
          //console.log('this при вызове проверки через секунду после ввода' + this);
          let inputText = arguments[0];
          if(inputText !== input1.value){ return; }
          f.call(this, ...args);
        };
        setTimeout(checkIfUserStoppedInput.bind(this), delay, event.target.value, ...args);   
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="filter">
      </p>

      <p>
        Sort by:
        <select data-element="select-sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
