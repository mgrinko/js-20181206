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

// document.addEventListener('click', () => {
//   console.log('Clicked');
//   resolve('success');
// });
//
// setTimeout(() => {
//   console.log('Timeout occurred');
//   reject('error');
// }, 5000);

const instructionFunction = (resolve, reject) => {
  resolve(1);
  resolve(2);
  reject(3);
};

const weddingPromise = new Promise(instructionFunction);

weddingPromise.then(
  (data) => console.log('OK: ', data)
);

weddingPromise.catch(
  (error) => console.warn('FAIL: ', error)
);
