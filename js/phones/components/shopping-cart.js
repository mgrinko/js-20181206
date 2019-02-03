export default class ShoppingCart{
  constructor({ element }){
    this._element = element;

    this._insideCart = [];
    this.find = function(id){
      for (var i = 0; i < this._insideCart.length; i++){
        if (this._insideCart[i][0] === id) return i;
      }
      return false;
    }
    this._render();
    this._element.addEventListener('click', (event) => {
      if (event.target.dataset.element == 'clean-cart') {
        this.removeAll();
        return;
      }
      let thisId = event.target.closest('li[data-id]').dataset.id;
      if (event.target.dataset.element == 'add-button'){
        this.add(thisId);
      }
      if (event.target.dataset.element == 'delete-button'){
        this.delete(thisId);
        console.log(this._insideCart );
      }
      if (event.target.dataset.element == 'remove-button') {
        this.remove(thisId);
      }

    });
  }
  add(phoneId){
    let newElem = [phoneId, 1];
    let idFounded = this.find(phoneId);
    if (idFounded === false) this._insideCart.push(newElem);
    else this._insideCart[idFounded][1]++;
    this._render();
  }
  delete(phoneId){
    let idFounded = this.find(phoneId);
    if(this._insideCart[idFounded][1] > 1 ) this._insideCart[idFounded][1]--;
    else this.remove(phoneId);
    this._render();
  }
  remove(phoneId){
    let idFounded = this.find(phoneId);
    if (idFounded !== false) {
      this._insideCart.splice(idFounded,1);
      this._render();
    }
  }
  removeAll(){
    this._insideCart = [];
    this._render();
  }

  _render(){
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
         ${ 
            this._insideCart.map((elem) =>
            ` <li data-id = "${ elem[0] }">
                ${ elem[0] }
                <button data-element="delete-button">-</button> 
                ${ elem[1] }
                <button data-element="add-button">+</button> 
                <button data-element="remove-button">Удалить</button>
              </li>`
          ).join('')
        }
      </ul>
      <button data-element = "clean-cart">Очистить корзину</button>
    `;
  }
}