export default class PhoneViewer {
  constructor({ element, onClose, onAddToCart }) {
    this._element = element;
    this._onClose = onClose;
    this._onAddToCart = onAddToCart;

  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

    this._render();
    this._mainImg = this._element.querySelector('[data-main-img]');
    this._element.addEventListener('click', (event)=>{
      const backBtn = event.target.closest('[data-back]');

      if(!backBtn){
       return;
      }

      this.hide();
      this._onClose();
    })

    this._element.addEventListener('click', (event)=>{
      const image = event.target.closest('[data-img-id]');

      if(!image){
        return;
      }

      const imgId = image.dataset.imgId;
      this._mainImg.src = this._phoneDetails.images[imgId];
      
    })

    this._element.addEventListener('click', (event)=>{
     
      const addToCartBtn = event.target.closest('[data-add-item]');
      if(!addToCartBtn){
        return;
      }
      this._onAddToCart(this._phoneDetails);

    })
  }
  
  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img data-main-img class="phone" src="${ phone.images[0] }">

      <button data-back>Back</button>
      <button data-add-item>Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
      ${phone.images.map((photo, ind) => `
        <li>
          <img data-img-id="${ind}" src="${photo}">
        </li>
        `).join('')}
      </ul>
    `;
  }
}
