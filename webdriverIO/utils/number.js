const regex = require('./regexPatterns');

class NumberHelper {
  getRandomNumber(min, max) {
    return Math.max(Math.floor(Math.random() * max), min);
  }

  getNumberOfLengthN(n) {
    const random = Math.random() + 1;
    const length = 10 ** (n - 1);
    const number = random * length;
    return parseInt(random * number, 10);
  }

  getRandomDollarAmount(min, max, decimalPlaces) {
    const randNum = Math.random() * (max - min) + min;
    const power = 10 ** decimalPlaces;
    return Math.floor(randNum * power) / power;
  }

  totalArrayOfNumbers(arr) {
    let arrayOfNumbers;
    if (Array.isArray(arr) && typeof arr[0] === 'string') {
      arrayOfNumbers = arr.map((index) => {
        const number = index.match(regex.isNumber)[0].replace(',', '');
        return Number(number);
      });
    } else arrayOfNumbers = arr;

    const total = arrayOfNumbers.reduce((sum, value) => sum + value);

    return total;
  }
}

module.exports = new NumberHelper();
