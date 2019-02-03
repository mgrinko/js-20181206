export default class PhoneViewer{
  constructor({ element, catalog, cart}){
    this._element = element;
    this._catalog = catalog;
    this._cart = cart;

    this._element.addEventListener('click', (event) => {
      let eventTarget = event.target;
      let bigImg = this._element.querySelector('[data-big-img]'); 

      if (!eventTarget) return;
      
      if (eventTarget.dataset.img) bigImg.src = eventTarget.src;
      if (eventTarget.dataset.button == 'back') {
        this.hide();
        this._catalog.show()
      }
      if (eventTarget.dataset.addToCart){
        this._cart.add(this._phoneDetails.id);
      }
    });
  }
  hide(){
    this._element.hidden = true;
  }
  show(phoneDetails){
    this._element.hidden = false;
    this._phoneDetails = phoneDetails;

    this._render();
  }
  _render(){
    let phone = this._phoneDetails;
    let phoneImages = phone.images;

    this._element.innerHTML = `
      <img data-big-img class="phone" src="${ phone.images[0] }">

      <button
        data-button = 'back'
      >
      Back</button>
      <button 
        data-add-to-cart = ${ phone.id }
      >
      Add to cart</button>


      <h1>${ phone.name }</h1>

      <p>${ phone.description }</p>
      <ul class="phone-thumbs">
       ${ 
          phoneImages.map(
            (elem, index) =>
            ` <li>
                <img data-img="${ phone.id }" src="${ elem }"> 
              </li>`
          ).join('')
        }
      </ul>
    `;


  }
}