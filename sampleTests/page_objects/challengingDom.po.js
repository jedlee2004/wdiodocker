const Elements = require('../../webdriverIO/helpers/element.helper');
const { timeout } = require('../../webdriverIO/helpers/constants');

module.exports = class ChallengingDom extends Elements {
  constructor() {
    super();
    this.url = '/challenging_dom';
  }

  get summaryText() { return $('.example p'); }
  get table() { return $('table'); }
  get button1() { return $('.button:nth-child(1)'); }
  get button2() { return $('.alert'); }
  get button3() { return $('.success'); }
  get canvas() { return $('#canvas'); }

  getDomTable() {
    return this.getTable(this.table);
  }

  clickButton(button) {
    button.waitForExist(timeout);
    const originalVal = button.getText();
    button.click();
    browser.pause(100);
    const newVal = button.getText();

    return {
      originalVal,
      newVal,
    };
  }
};
