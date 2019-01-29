export default class PhoneViewer {
  constructor({ element, onClose }) {
    this._element = element;
    this._onClose = onClose;

  }

  hide() {
    this._element.hidden = true;
  }

  show(phoneDetails) {
    this._element.hidden = false;

    this._phoneDetails = phoneDetails;

    this._render();
    this._mainImg = this._element.querySelector('[data-main-img]');
    this._element.addEventListener('click', (e)=>{
      const backBtn = e.target.closest('[data-back]');

      if(backBtn){
        this.hide();
        this._onClose();
      }
      
      const image = e.target.closest('[data-img-id]');

      if(image){
        const imgId = image.dataset.imgId;
        this._mainImg.src = this._phoneDetails.images[imgId];
      }
      
    });
  }
  _render() {
    let phone = this._phoneDetails;

    this._element.innerHTML = `
      <img data-main-img class="phone" src="${ phone.images[0] }">

      <button data-back>Back</button>
      <button>Add to basket</button>
  
  
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
