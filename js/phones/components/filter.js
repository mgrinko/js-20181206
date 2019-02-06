import Component from '../../component.js';

export default class Filter extends Component {
  constructor({ element, phones}){
    super({ element });

    this._render();
    this._phones = phones;

    this.on('keyup', 'search', (event) => this.emit('phone-search', event.target.value));
    this.on('change','filter', (event) => this.emit('phone-filter', event.target.value));
  }
  
  _render(){
    this._element.innerHTML = `          
      <p>
        Search:
        <input data-element = 'search' value=''>
      </p>
      <p>
        Sort by:
        <select data-element = "filter">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}