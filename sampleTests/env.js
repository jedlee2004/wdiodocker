const CLI = require('../webdriverIO/utils/commandConfig');

const environments = {
  local: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'https://cxh-api.dev.cps-core.com',
  },
  dev: {
    baseUrl: 'https://my.dev.nutrienagsolutions.com',
    apiUrl: 'https://cxh-api.dev.cps-core.com',
  },
};

module.exports = () => {
  const cli = new CLI(environments);
  cli.processArgs();
};
