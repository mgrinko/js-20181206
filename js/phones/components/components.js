export default class Components {


    _show(element,callback){
        element.hidden = false;

        if(callback!==undefined)
            callback();
    }

    _hide(element){
        element.hidden = true;
    }


}
