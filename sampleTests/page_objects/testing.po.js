const Elements = require('../../webdriverIO/helpers/element.helper');

module.exports = class Tables extends Elements {
  constructor() {
    super();
    this.url = '/tables';
    this.table = null;
  }

  get tableOne() { return $('#table1'); }
  get tableTwo() { return $('#table2'); }

  getTableColumn(selector, columnIndex) {
    const table = this.getTable(selector);
    return this.getNthColumnFromTable(columnIndex, table);
  }

  getLastNameColumn() {
    return this.getTableColumn(this.tableOne, 0);
  }

  getFirstNameColumn() {
    return this.getTableColumn(this.tableOne, 1);
  }

  getEmailColumn() {
    return this.getTableColumn(this.tableOne, 2);
  }

  getDueColumn() {
    return this.getTableColumn(this.tableOne, 3);
  }

  getWebSiteColumn() {
    return this.getTableColumn(this.tableOne, 4);
  }

  getActionColumn() {
    return this.getTableColumn(this.tableOne, 5);
  }
};
