'use strict';



let myComponent = {
  _callbackMap: {},

  subscribe(eventName, callback) {
    let eventCallbacks = this._callbackMap[eventName] || [];

    eventCallbacks.push(callback);

    this._callbackMap[eventName] = eventCallbacks;
  },

  emit(eventName, data) {
    let eventCallbacks = this._callbackMap[eventName] || [];

    eventCallbacks.forEach(callback => {
      callback(data);
    });
  },
};


myComponent.subscribe('phone-selected', (data) => {
  console.log('phone-selected', data);
});


myComponent.emit('phone-selected', 123);
