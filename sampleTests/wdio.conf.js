const merge = require('deepmerge');
const wdioConf = require('../wdio.main.conf.js');
require('./env')();

exports.config = merge(
  wdioConf.config,
  {
    specs: [`${__dirname}/**/*.spec.js`],
    suites: {
      smoke: [
        `${__dirname}/specs/*.spec.js`,
      ],
    },

    baseUrl: process.env.BASEURL
      ? process.env.BASEURL
      : 'https://the-internet.herokuapp.com',

    capabilities: process.env.CAPS
      ? [JSON.parse(process.env.CAPS)]
      : [
        {
          browserName: process.env.BROWSER || 'chrome',
          maxInstances: '1',
        },
      ],
  },
  { clone: false },
);
