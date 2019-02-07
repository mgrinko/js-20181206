'use strict';

class MyPromise {
  constructor(instructionsFn) {
    this._status = 'Waiting';

    instructionsFn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(data) {
    if (this._status !== 'Waiting') {
      return;
    }

    this._status = 'Success';
  }

  reject(error) {
    if (this._status !== 'Waiting') {
      return;
    }

    this._status = 'Error';
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


