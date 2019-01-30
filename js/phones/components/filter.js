import BaseComponent from './base-component.js';

export default class Filter extends BaseComponent {
  constructor({ element }) {
    super({ element })

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input>
      </p>

      <p>
        Sort by:
        <select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
