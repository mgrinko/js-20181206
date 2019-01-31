export default class PhoneViewer {
  constructor({ element, onBackCatalog }) {
    this._element = element;
    this._onBackCatalog = onBackCatalog;

    this._phoneDetails = null;

    //галерея
    this._element.addEventListener('click', (event) => {
        const previewImage = event.target.closest('.js-preview_item_image');

        if (!previewImage) return;

        const viewImage = this._element.querySelector('.js-view_item_image');
        viewImage.src = previewImage.src;
    });

    //назад
    this._element.addEventListener('click', (event) => {
        const backLink = event.target.closest('.js-backLink');

        if (!backLink) return;

        this._onBackCatalog();
    });
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
        <li>
          <img class="js-preview_item_image" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img class="js-preview_item_image" src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img class="js-preview_item_image" src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img class="js-preview_item_image" src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img class="js-preview_item_image" src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
  }
}
