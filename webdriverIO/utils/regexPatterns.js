class RegexPatterns {
  get isNumber() {
    return /[\d|,|.\+]+/g;
  }

  get testIsCurrency() {
    return /(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/;
  }

  get matchCurrency() {
    return /\B(?=(\d{3})+(?!\d))/g;
  }

  get extractCurrencyFromString() {
    return /[^0-9\.\,\$]+/g;
  }

  currency(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  isValidCurrency(value) {
    return this.testIsCurrency.test(value);
  }

  getCurrencyFromString(string) {
    const number = string.replace(this.extractCurrencyFromString, '');
    if (this.isValidCurrency(number)) return number;
    return false;
  }
}

module.exports = new RegexPatterns();
