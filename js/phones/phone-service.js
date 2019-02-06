const PhoneService = {
  async getAll({ sortBy, query, page = 1, perPage = 1 }) {
    let phones = await fetch('./phones/phones.json');
    phones = await phones.json();

    if (query) {
      phones = this._filter(phones, query);
    }
    
    phones = this._sort(phones, sortBy);
    
    return phones;
  },

  async getById(phoneId) {
    let phoneDetailResponse = await fetch(`./phones/${phoneId}.json`);
    let phoneDetail = await phoneDetailResponse.json();
    
    return phoneDetail;
  },

  _filter(phones, query) {
    const normalizedQuery = query.toLowerCase();

    return phones.filter((phone) => {
      return phone.name.toLowerCase().includes(normalizedQuery);
    });
  },

  _sort(phones, sortBy) {
    return phones.sort((phoneA, phoneB) => {
      return phoneA[sortBy] > phoneB[sortBy] ? 1 : -1
    });
  },

};

export default PhoneService;