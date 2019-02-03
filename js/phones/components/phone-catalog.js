export default class PhoneCatalog{
  constructor({ element, phones, cart, onPhoneSelected}){
    this._element = element;
    this._phones = phones;
    this._cart = cart;
    this._onPhoneSelected = onPhoneSelected;
    
    this._element.addEventListener('click',(event)=>{
      if (event.target.dataset.addToCart){
        console.log(event.target.dataset.addToCart);
        this._cart.add(event.target.dataset.addToCart);
      }
      const phoneLink = event.target.closest('[data-element="phone-link"]');

      if (!phoneLink) return;

      const phoneElement = phoneLink.closest('[data-element="phone"]');
      this._onPhoneSelected(phoneElement.dataset.phoneId);


    });
    this._render();
  }

  hide(){
    this._element.hidden = true;
  }
  
  show(phoneDetails){
    this._element.hidden = false;
  }

  _render(){
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
                  <img alt="${ phone.name }™ with Wi-Fi" src="${ phone.imageUrl }">
                </a>

                <div class="phones__btn-buy-wrapper">
                <a 
                  data-add-to-cart = "${ phone.id }"
                  class="btn btn-success">
                  Add
                </a>
              </div>

              <a 
                data-element="phone-link"
                href="#!/phones/${ phone.id }"  
              >
                ${ phone.name }
              </a>
              <p>
                ${ phone.snippet }
              </p>
              </li>
              `).join('')
            }
         </ul>
    `;
  }
}