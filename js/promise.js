'use strict';

const STATUS_PENDING = 'pending';
const STATUS_RESOLVED = 'resolved';
const STATUS_REJECTED = 'rejected';

class MyPromise {
  constructor(instructionsFn) {
    this._status = STATUS_PENDING;
    this._result = null;

    this._errorCallbacks = [];
    this._successCallbacks = [];

    instructionsFn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(data) {
    if (this._status !== STATUS_PENDING) {
      return;
    }

    this._status = STATUS_RESOLVED;
    this._result = data;

    for (let callback of this._successCallbacks) {
      callback(data);
    }
  }

  reject(error) {
    if (this._status !== STATUS_PENDING) {
      return;
    }

    this._status = STATUS_REJECTED;
    this._result = error;

    for (let callback of this._errorCallbacks) {
      callback(error);
    }
  }

  then(onSuccess, onError) {
    if (this._status === STATUS_RESOLVED && onSuccess) {
      onSuccess(this._result)
      return;
    }

    if (this._status === STATUS_REJECTED && onError) {
      onError(this._result)
      return;
    }

    if (onSuccess) {
      this._successCallbacks.push(onSuccess)
    }

    if (onError) {
      this._errorCallbacks.push(onSuccess)
    }
  }
}
