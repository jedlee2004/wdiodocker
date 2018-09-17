class Session {
  getAllStorage() {
    return browser.localStorage();
  }

  deleteAllStorage() {
    return browser.localStorage('DELETE');
  }

  deleteByKey(key) {
    const searchKey = key.toLowerCase();
    return browser.localStorage('DELETE', searchKey);
  }

  getItemByKey(key) {
    const searchKey = key.toLowerCase();
    return browser.localStorage('GET', searchKey);
  }

  storeData(keyName, data) {
    const postObject = {
      key: keyName,
      value: data,
    };

    return browser.localStorage('POST', postObject);
  }
}

module.exports = new Session();
