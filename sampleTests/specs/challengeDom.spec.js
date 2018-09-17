const DOM = require('../page_objects/challengingDom.po');

describe('Testing Challenging Dom', () => {
  const dom = new DOM();

  beforeAll(() => {
    browser.url(dom.url);
  });

  it('should have the following summary text', () => {
    const text = dom.summaryText.getText();
    expect(text.length).toEqual(338);
  });

  it('should retrieve all table data', () => {
    const table = dom.getDomTable();
    const expectedHeaders = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action'];
    expect(table.headers).toEqual(expectedHeaders);
  });

  it('should click button 2 and button 3 and have their text values change', () => {
    const valChange2 = dom.clickButton(dom.button2);
    const valChange3 = dom.clickButton(dom.button2);
    expect(valChange2.originalVal).not.toEqual(valChange2.newVal);
    expect(valChange3.originalVal).not.toEqual(valChange3.newVal);
  });
});
