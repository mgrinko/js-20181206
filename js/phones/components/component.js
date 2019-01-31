'use strict';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;
  }
}
