const PhoneService = {

  cacheRequest:{},

  getAll(query='',sort='',page=1,onPage=0) {

    let phonesList = this.request('phones/phones.json');
    //фильтрация

      console.log(phonesList);
    phonesList = phonesList.filter((phone)=>{
      let namePhone = phone.name.toLowerCase();
      return namePhone.includes(query);
    });

    //сортировка
    phonesList.sort((a,b)=>{
      let valA = a[sort];
      let valB = b[sort];
      if(sort==='name'){
        valA.toLowerCase();
        valB.toLowerCase();
      }

      if (valA < valB) return -1;//сортируем строки по возрастанию
      if (valA > valB) return 1;
      return 0;

    });

    return phonesList;
  },

  getById(phoneId) {
    return this.request('phones/'+phoneId+'.json');
  },

  request(url){

    //закешируем
    if(!this.cacheRequest.hasOwnProperty(url)){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);
        xhr.send();

        console.log(xhr);

        this.cacheRequest[url] = xhr.response;
    }

    return JSON.parse(this.cacheRequest[url]);
  }
};

export default PhoneService;
