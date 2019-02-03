import Base from './base.js';

export default class PhoneCatalog extends Base{
  constructor({ element, phones }) {
    super({element});

    this._phones = phones;

    this._render();

    //клик по ссылке товара
    this.on('click','[data-element="phone-link"]','open-phone');

    //клик по кнопке "add"
    this.on('click','.js-addInCart','add-cart');


  }


  _render() {

    if(!this._phones.length){
      this._element.innerHTML = `
        <ul class="phones">
          <li><h2>Ничего не нашлось</h2></li>
        </ul>
      `;

      return;
    }

    this._element.innerHTML = `
      <ul class="phones">
      
        ${ this._phones.map(phone => `

          <li
            data-element="phone"
            data-phone-id="${ phone.id }"
            class="thumbnail"
          >
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a 
                class="btn btn-success js-addInCart" 
                data-id="${ phone.id }"
                data-name="${ phone.name }"
              >
                Add
              </a>
            </div>
  
            <a
              data-element="phone-link"
              href="#!/phones/${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      
        
      </ul> 
    `;
  }
}
