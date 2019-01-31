export default class Components {


    _show( element, callback = ()=>{} ){
        element.hidden = false;
        callback();
    }

    _hide( element ){
        element.hidden = true;
    }

    _debounce(f, delay){
        let timer = null;

        return function(...args){
            //при повторном запуске очищаем и запускаем таймер по новой
            clearTimeout(timer);
            timer = setTimeout(f.bind(this, ...args),delay);

        }
    }


}
