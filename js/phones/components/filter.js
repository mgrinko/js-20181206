export default class Filter{
  constructor({ element, phones, catalog }){
    this._element = element;
    this._catalog = catalog;
    this._render();
    this._phones = phones;


    this._positiveArr = []
    this._element.querySelector('[data-element = "search"]').addEventListener('keyup', (event) => {
      this.search(event.target.value.toLowerCase());
    });
    this._element.querySelector('[data-select]').addEventListener('change', (event) => {
      this.filter(event.target.value);
    });
  }
  search(elem){
     this._positiveArr = this._phones.filter(function(item) {
      let itemName = item.name.toLowerCase();
      if (itemName.indexOf(elem) == -1 ) return false;
      return item; 
    });
    this._renderCatalog(this._positiveArr)
  }
  filter(elem){
    let arr = this._phones;
    console.log(elem);

    function compareNumeric(a, b) {
      if (a[elem] > b[elem]) return 1;
      if (a[elem] < b[elem]) return -1;
    }
    arr.sort(compareNumeric);
    this._renderCatalog(arr);
  }
  _renderCatalog(newArr){
    this._catalog.innerHTML = `
        <ul class="phones">
          ${  newArr.map((elem) => `
              <li 
                data-element="phone"
                data-phone-id="${ elem.id }"
                class="thumbnail"
              >
                <a 
                  data-element="phone-link"
                  href="#!/phones/${ elem.id }" 
                  class="thumb" 
                >
                  <img alt="${ elem.name }™ with Wi-Fi" src="${ elem.imageUrl }">
                </a>

                <div class="phones__btn-buy-wrapper">
                <a 
                  data-add-to-cart = "${ elem.id }"
                  class="btn btn-success">
                  Add
                </a>
              </div>

              <a 
                data-element="phone-link"
                href="#!/phones/${ elem.id }"  
              >
                ${ elem.name }
              </a>
              <p>
                ${ elem.snippet }
              </p>
              </li>
              `).join('')
            }
         </ul>
    `;
  }

  _render(){
    this._element.innerHTML = `          
      <p>
        Search:
        <input data-element = 'search' value=''>
      </p>
      <p>
        Sort by:
        <select data-select>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}