const PhoneService = {
  getAll: function ({ sortBy, query, page = 1, perPage = 1 }) {
    return fetch('./phones/phones.json', {
      method: "GET"
    })
      .then(response => response.json())
      .then(phones => {
        if (query) {
          phones = phones.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase())).sort((phone1, phone2) => phone1[sortBy] > phone2[sortBy] ? 1 : -1);
        } else {
          phones.sort((phone1, phone2) => phone1[sortBy] > phone2[sortBy] ? 1 : -1);
        }
        return phones;
      })


  },

  getById(phoneId) {
    return fetch(`./phones/${phoneId}.json`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(phone => {

        return phone;
      })
  }
};

export default PhoneService;