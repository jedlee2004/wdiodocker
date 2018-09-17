const { timeout } = require('./constants');

module.exports = class ElementHelper {
  get baseURL() {
    return process.env.BASEURL || browser.options.baseUrl;
  }

  get baseAPI() {
    return process.env.API;
  }

  get environment() {
    return process.env.ENV;
  }

  validateHeaders(headers, array) {
    let found = 0;
    headers.array.forEach((header, i) => {
      if (header.getText().indexOf(array[i]) === 0) {
        console.log(`Column header: ${header.getText()}`);
        found += 1;
      }
    });
    return found;
  }

  waitForPagetoNavigate(url) {
    return browser.waitUntil(
      () => {
        const current = browser.getUrl();
        $('body').waitForExist(timeout);
        return current.includes(url);
      },
      timeout,
      'Page failed to load',
    );
  }

  waitForText(element, innerText) {
    return browser.waitUntil(
      () => element.getText().includes(innerText),
      timeout,
      'Wait for inner text to include the given parameter.',
    );
  }

  waitForSpinners(selector, additionalPause = 500) {
    browser.waitUntil(
      () => selector.isVisible() === false,
      timeout,
      `expected loading spinner to be gone after ${timeout} milliseconds`,
    );
    browser.pause(additionalPause);
  }

  selectDropdownOptionByIndex(dropDownSelector, option) {
    dropDownSelector.selectByIndex(option);
    return dropDownSelector.getValue();
  }

  isElemVisible(selector) {
    try {
      selector.waitForVisible(timeout);
      return true;
    } catch (error) {
      console.error(
        `Element with selector ${selector} was not visible after ${timeout} ms`,
      );
      return false;
    }
  }

  setInput(text, selector, noTab) {
    let input = text;
    if (typeof text === 'number') input = text.toString();
    selector.waitForVisible(timeout);
    selector.scroll();
    selector.click();
    selector.clearElement();
    selector.keys(input);
    if (!noTab) browser.keys('Tab');

    return selector.getAttribute('value');
  }

  setRadioButton(selector) {
    selector.waitForExist(timeout);
    selector.scroll();

    if (selector.isSelected()) return selector.isSelected();

    selector.click();
    return selector.isSelected();
  }

  setCheckBox(selector) {
    selector.waitForExist(timeout);
    selector.scroll();

    selector.click();
    browser.pause(1000);
    return selector.isSelected();
  }

  getSetDropDownList(_set, selector, button) {
    const dropListButton = button;
    dropListButton.waitForVisible(timeout);
    dropListButton.click();

    const list = selector ? selector.$$('ul li') : $$('ul li');

    browser.waitUntil(
      () => list.length >= 1,
      timeout,
      'Failed to retrieve user options',
    );

    const options = list.map(li => ({
      value: li.getText(),
      selector: li,
    }));

    if (_set !== null) {
      const select = options.find(option => option.value.includes(_set));
      if (select !== undefined) {
        select.selector.click();
      } else throw new Error(`Option ${_set} does not exist in this drop list`);
    } else {
      dropListButton.click();
    }

    return {
      setValue: dropListButton.getText(),
      options,
    };
  }

  getSetCombobox(baseSelector, option) {
    baseSelector.waitForVisible(timeout);
    const base = baseSelector.selector.includes('select')
      ? baseSelector
      : baseSelector.$('select');
    base.click();

    const options = baseSelector.$$('option').map(index => ({
      selector: index,
      value: index.getText(),
    }));

    if (option) {
      const select = options.find(opt => opt.value === option);
      select.selector.click();
      options.selected = select;
    }

    return options;
  }

  getLabels(value, selectors) {
    const labels = $$('label');

    if (value && typeof value === 'string') {
      return labels
        .map(label => label.getText().split('\n')[0])
        .filter(label => label === value);
    }

    if (selectors) {
      return labels.filter(label => label.getText() !== '');
    }

    return labels
      .map(label => label.getText().split('\n')[0])
      .filter(label => label !== '');
  }

  getErrorMessages(baseSelector, elemTag = 'p') {
    if ($(baseSelector).isExisting()) {
      const errors = $$(`${baseSelector} ${elemTag}`);
      return errors.map(error => error.getText());
    }
    return false;
  }

  getWarningMessages(baseSelector) {
    const warn = baseSelector;
    warn.waitForExist(timeout);
    if (warn.isExisting()) {
      const warnings = warn.$$('p');
      return warnings.map(error => error.getText());
    }
    return false;
  }

  getTable(baseSelector) {
    baseSelector.waitForVisible(timeout);

    const table = {};
    table.headers = baseSelector.$$('thead th').map((th) => {
      if (th.getText() !== undefined) return th.getText();
      return null;
    });

    table.rows = baseSelector.$$('tbody tr').map((tr) => {
      const td = tr.$$('td').map((column) => {
        if (column.getText().includes('\n')) {
          const data = column.getText().split('\n');
          if (data.length > 2) {
            return {
              data,
              selector: column,
            };
          }

          return {
            label: data[0],
            value: data[1],
            selector: column,
          };
        }
        return {
          label: column.getText(),
          selector: column,
        };
      });

      return {
        selector: tr,
        rowData: td,
      };
    });

    return table;
  }

  getNthRowFromTable(nth, tableObject) {
    return tableObject.rows[nth].rowData;
  }

  getNthColumnFromTable(nth, tableObject) {
    return tableObject.rows.map(row => row.rowData[nth]);
  }

  navigatePagination(selector, option) {
    selector.waitForExist(timeout);
    const options = this.selector.$$('li').map((index) => {
      const title = index.getAttribute('title');
      if (title === option) index.click();

      return {
        selector: index,
        name: title,
      };
    });

    return options;
  }

  scrollInContainer(scrollableEl, scrollAmt = null, scrollDir = 'down', pauseTime = 2000) {
    browser.execute((el, amt, dir, time) => {
      // Scroll to bottom by calc scroll amt from difference
      // between total container length and viewport
      if (!amt) {
        const scrollElemH = el.getElementSize('height');
        const viewportH = browser.getViewportSize('height');
        amt = (scrollElemH - viewportH);
      }
      if (dir === 'down') el.value.scrollTop += amt;
      else el.value.scrollTop -= amt;
      browser.pause(time);
    }, scrollableEl, scrollAmt, scrollDir, pauseTime);
  }
};
