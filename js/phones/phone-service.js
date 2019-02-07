

const PhoneService = {
  getAll(callback, { query = '', orderBy = 'age', page = 1, perPage = 10 } = {}) {
    let url = 'https://mgrinko.github.io/js-20181206/phones/phones.json';

    const phonesPromise = this._sendRequest(url);

    phonesPromise.then((phones) => {
      const filteredPhones = this._filter(phones, query);
      const sortedPhones = this._sort(filteredPhones, orderBy);

      callback(sortedPhones);
    })
  },

  getById(phoneId, callback) {
    let url = `https://mgrinko.github.io/js-20181206/phones/${ phoneId }.json`;

    let phoneDetailsPromise = this._sendRequest(url);

    phoneDetailsPromise.then(callback)
  },


  _sendRequest(url) {
    const instructionsFn = (resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(`Server error: ${ xhr.status } ${ xhr.statusText }`);
          return;
        }

        const data = JSON.parse(xhr.responseText);

        resolve(data);
      };
    };

    return new Promise(instructionsFn);
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
