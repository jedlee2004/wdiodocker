const Dropdown = require('../page_objects/dropdown.po');

describe('Testing Dropdowns', () => {
  const dropdown = new Dropdown();

  beforeAll(() => {
    browser.url(dropdown.url);
  });

  it('should return the dropdown options', () => {
    const optionsObj = dropdown.getSetDropDown();
    const optionsText = optionsObj.map(index => index.value);
    const expected = ['Please select an option', 'Option 1', 'Option 2'];
    expect(optionsText).toEqual(expected);
  });

  it('should select an option from dropdown', () => {
    const option = 'Option 1';
    const options = dropdown.getSetDropDown(option);
    const selected = options.selected.value;
    expect(selected).toEqual('Option 1');
  });
});
