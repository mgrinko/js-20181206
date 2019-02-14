import Component from '../../component.js';
import debounce from 'lodash/debounce';

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    const emitQueryChangedWithDeboune = debounce(
      (event) => {
        this.emit('query-changed', event.target.value);
      },

      500
    );

    this.on('input', 'query-field', emitQueryChangedWithDeboune);

    this.on('change', 'order-field', (event) => {
      this.emit('order-changed', event.target.value);
    });
  }

  getCurrentData() {
    let orderField = this._element.querySelector('[data-element="order-field"]');
    let queryField = this._element.querySelector('[data-element="query-field"]');

    return {
      query: queryField.value,
      orderBy: orderField.value,
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="query-field">
      </p>

      <p>
        Sort by:
        <select data-element="order-field">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
