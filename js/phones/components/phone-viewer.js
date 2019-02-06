import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }){
    super({ element });

/*    this._element.addEventListener('click', (event) => {
      if (eventTarget.dataset.addToCart){
        this._cart.add(this._phoneDetails.id);
      }
    });
*/
    this.on('click', 'back-button', () => this.emit('back'));
    this.on('click', 'add-button', () => this.emit('add', this._phoneDetails.id));
    this.on('click', 'small-image', (event) => {
      let smallImage = event.target;
      let largeImg = this._element.querySelector('[data-element="large-image"]');

      largeImg.src = smallImage.src; 
    });
  }

  show(phoneDetails){
    this._phoneDetails = phoneDetails;

    super.show();

    this._render();
  }

  _render(){
    let phone = this._phoneDetails;
    let phoneImages = phone.images;

    this._element.innerHTML = `
      <img 
        data-element="large-image" 
        class="phone" 
        src="${ phone.images[0] }"
      >

      <button
        data-element = 'back-button'
      >
      Back</button>
      <button 
        data-element="add-button" data-add-to-cart = ${ phone.id }
      >
      Add to cart</button>


      <h1>${ phone.name }</h1>

      <p>${ phone.description }</p>
      <ul class="phone-thumbs">
       ${ 
          phoneImages.map(
            (elem, index) =>
            ` <li>
                <img 
                  data-element="small-image" 
                  src="${ elem }"
                > 
              </li>`
          ).join('')
        }
      </ul>
    `;


  }
}