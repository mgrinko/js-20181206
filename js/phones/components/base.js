export default class Base {

    constructor({ element }) {
        this._element = element;
        this._eventsCollection = {};
    }

    show(){
        this._element.hidden = false;
    }

    hide(){
        this._element.hidden = true;
    }

    on(eventName,querySelector,emitName){
        this._element.addEventListener(eventName, (event) => {
            const element = event.target.closest(querySelector);

            if (!element) return;


            this.emit(emitName,event);

        });
    }

    debounce(f, delay){
        let timer = null;

        return function(...args){
            //при повторном запуске очищаем и запускаем таймер по новой
            clearTimeout(timer);
            timer = setTimeout(f.bind(this, ...args),delay);

        }
    }

    subscribe(eventName,callback){
        if(!this._eventsCollection.hasOwnProperty(eventName)){
            this._eventsCollection[eventName] = [];
        }

        this._eventsCollection[eventName].push(callback);
    }

    emit(eventName,data){

        if(!this._eventsCollection.hasOwnProperty(eventName))
            this._eventsCollection[eventName] = [];

        this._eventsCollection[eventName].forEach(func=>func(data));
    }


}
