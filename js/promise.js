'use strict';

const STATUS_PENDING = 'pending';
const STATUS_RESOLVED = 'resolved';
const STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(instructionsFn) {
    this._status = STATUS_PENDING;
    this._errorCallbacks = [];
    this._successCallbacks = [];

    instructionsFn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(data) {
    if (this._status !== STATUS_PENDING) {
      return;
    }

    this._status = STATUS_RESOLVED;

    for (let callback of this._successCallbacks) {
      callback(data);
    }
  }

  reject(error) {
    if (this._status !== STATUS_PENDING) {
      return;
    }

    this._status = STATUS_REJECTED;

    for (let callback of this._errorCallbacks) {
      callback(error);
    }
  }

  then(onSuccess, onError) {
    if (onSuccess) {
      this._successCallbacks.push(onSuccess)
    }

    if (onError) {
      this._errorCallbacks.push(onSuccess)
    }
  }
}



Promise.resolve(123)
  .then((data) => {
    console.log(data, 3);
    JSON.parse('{')
  })
  .catch((error) => {
    console.warn(error, 3);
  })
  .then(
    data => console.log(data)
  )
  .catch((error) => {
    console.warn(error, 3);
  });


