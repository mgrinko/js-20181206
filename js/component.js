export default class Component {

    constructor({ element }) {
      this._element = element;
      this._callbackMap = {};
    }
  
    on(eventName, elementsNames, callback) {
      this._element.addEventListener(eventName, (event) => {
        if(typeof elementsNames === 'string') {
          const delegateTarget = event.target.closest(`[data-element="${ elementsNames }"]`);
    
          if (!delegateTarget) {
            return;
          }
    
          callback(event);
        } else {

         
          for(let i = 0; i< elementsNames.length; i++){
            const delegateTarget = event.target.closest(`[data-element="${ elementsNames[i] }"]`);
      
            if (!delegateTarget) {
              continue;
            }
      
            callback(event);
            break;
          }
        }
      });
    }
  
    show() {
      this._element.hidden = false;
    }
  
    hide() {
      this._element.hidden = true;
    }
    
    find(selector) {
        return this._element.querySelector(selector);
    }

    subscribe(eventName, callback) {
      let eventCallbacks = this._callbackMap[eventName] || [];
  
      eventCallbacks.push(callback);
  
      this._callbackMap[eventName] = eventCallbacks;
    }
  
    emit(eventName, data) {
      let eventCallbacks = this._callbackMap[eventName] || [];
  
      eventCallbacks.forEach(callback => {
        callback(data);
      });
    }
  }