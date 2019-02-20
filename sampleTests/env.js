const CLI = require('../webdriverIO/utils/commandConfig');

const environments = {
  local: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'https://the-internet.herokuapp.com/',
  },
  dev: {
    baseUrl: 'https://the-internet.herokuapp.com/',
    apiUrl: 'https://the-internet.herokuapp.com/',
  },
};

module.exports = () => {
  const cli = new CLI(environments);
  cli.processArgs();
};
