const Elements = require('../../webdriverIO/helpers/element.helper');

module.exports = class Dropdown extends Elements {
  constructor() {
    super();
    this.url = '/dropdown';
    this.dropdownOptions = null;
  }

  get dropdownSelector() { return $('select'); }

  getSetDropDown(option) {
    return this.getSetCombobox(this.dropdownSelector, option);
  }
};
