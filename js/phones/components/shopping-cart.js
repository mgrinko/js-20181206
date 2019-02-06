import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }){
    super({ element });

    this._insideCart = [];
    
    this.find = function(id){
      for (var i = 0; i < this._insideCart.length; i++){
        if (this._insideCart[i][0] === id) return i;
      }
      return false;
    }
    this._render();

    //Добавление в корзине
    this.on('click', 'add-button', (event) =>{
      let targetId = event.target.closest('li[data-phone-id]');

      this.add(targetId.dataset.phoneId);
    });

    //Удаление одной копии элемента
    this.on('click', 'delete-button', (event) =>{
      let targetId = event.target.closest('li[data-phone-id]');
      
      this.delete(targetId.dataset.phoneId);
    });

    //Удаление элемента (всех его копий) из корзины
    this.on('click', 'remove-button', (event) =>{
      let targetId = event.target.closest('li[data-phone-id]');
      this.remove(targetId.dataset.phoneId);
    });

    //Очистка корзины полностью
    this.on('click', 'clean-cart', (event) =>{
      this.cleanCart();
    });
  }
  add(itemIdToAdd) {
    let idFounded = this.find(itemIdToAdd);
   
    if (idFounded === false) {
      this._insideCart.push([itemIdToAdd, 1]);
    }
    else {
      this._insideCart[idFounded][1]++;
    }

    this._render();
  }
  delete(itemIdToDelete){
    let idFounded = this.find(itemIdToDelete);
    
    if(this._insideCart[idFounded][1] > 1 ) this._insideCart[idFounded][1]--;
    else this.remove(itemIdToDelete);
    this._render();

  }
  remove(itemIdToRemove){
    let idFounded = this.find(itemIdToRemove);
    if (idFounded !== false) {
      this._insideCart.splice(idFounded,1);
      this._render();
    }
  }
  cleanCart(){
    this._insideCart = [];  
    this._render();
  }
  _render(){
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
         ${ 
            this._insideCart.map((elem) =>
            ` <li data-phone-id = "${ elem[0] }">
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