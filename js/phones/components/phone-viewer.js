import Base from './base.js';

export default class PhoneViewer extends Base{
  constructor({ element }) {
    super({element});

    this._phoneDetails = null;

    //назад
    this.on('click','.js-backLink','back');

    //галерея
    this.on('click','.js-preview_item_image','gallery');

    //клик по кнопке "add"
    this.on('click','.js-addInCart','add-cart');

  }

  show(phoneDetails){

      super.show();
      this._phoneDetails = phoneDetails;
      this._render();
  }

  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone js-view_item_image" src="${ phone.images[0] }">

      <button class="js-backLink">Back</button>
      <button 
        class="js-addInCart" 
        data-id="${ phone.id }"
        data-name="${ phone.name }"
      >
        Add to basket
      </button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        
        ${ phone.images.map(image=>`
            <li>
              <img class="js-preview_item_image" src="${ image }">
            </li>
        `).join('') }
        
      </ul>
    `;
  }
}
