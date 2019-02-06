import Component from '../../component.js';

export default class PhoneCatalog extends Component{

  constructor({ element, phones, cart}){
    super({ element });

    this._phones = phones;
    
    this.on('click','phone-link',(event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });
    this.on('click', 'add-button', () => {
        const phoneElement = event.target.closest('[data-element="phone"]');
        this.emit('phone-added', phoneElement.dataset.phoneId);
      });
    this._render();
  }
  search(filteredPhones){
    this._phones = filteredPhones;

    this._render();
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
                  data-element="add-button"
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