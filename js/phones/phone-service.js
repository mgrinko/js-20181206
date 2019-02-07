

const PhoneService = {

  async getAll({ query = '', orderBy = 'age' }) {
    let url = 'https://mgrinko.github.asdio/js-20181206/phones/phones.json';

    const phones = await this._sendRequest(url);
    const filteredPhones = this._filter(phones, query);
    const sortedPhones = this._sort(filteredPhones, orderBy);

    return sortedPhones;
  },

  getById(phoneId, callback) {
    let url = `https://mgrinko.github.io/js-20181206/phones/${ phoneId }.json`;

    return this._sendRequest(url);
  },

  _sendRequest(url) {
    return fetch(url)
      .then(response => response.json());
  },

  _filter(phones, query) {
    const normalizedQuery = query.toLowerCase();

    return phones.filter((phone) => {
      return phone.name.toLowerCase().includes(normalizedQuery);
    });
  },

  _sort(phones, orderBy) {
    return phones.sort((phoneA, phoneB) => {
      return phoneA[orderBy] > phoneB[orderBy] ? 1 : -1
    });
  },
};

export default PhoneService;
