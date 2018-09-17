const JasmineConsoleReporter = require('jasmine-console-reporter');
const allureReport = require('./webdriverIO/utils/allureReport');

exports.config = {
  services: ['selenium-standalone'],
  port: 4444,
  seleniumArgs: {
    host: '127.0.0.1',
  },

  specs: [],
  suites: {},

  logLevel: 'silent',
  sync: true,
  coloredLogs: true,
  screenshotPath: './screenshots',
  baseUrl: process.env.BASEURL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  framework: 'jasmine',

  reporters: ['allure'],
  reporterOptions: {
    outputDir: './',
    allure: {
      outputDir: 'report/allure-results',
    },
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 9999999,
  },

  onPrepare: () => {
    console.log('Running WebdriverIO Tests');
  },

  beforeSession: (config, capabilities) => {
    if (process.env.DEVICE && capabilities.browserName === 'chrome') {
      capabilities.chromeOptions = {
        mobileEmulation: {
          deviceName: process.env.DEVICE,
        },
      };
    }
  },

  before: () => {
    console.log(
      `Browser: ${browser.desiredCapabilities.browserName},
       BaseURL: ${browser.options.baseUrl}`,
    );

    const jcReporter = new JasmineConsoleReporter({
      colors: 1, // (0|false)|(1|true)|2
      cleanStack: 1, // (0|false)|(1|true)|2|3
      verbosity: 4, // (0|false)|1|2|(3|true)|4
      listStyle: 'indent', // "flat"|"indent"
      activity: 'dots', // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
      emoji: true,
      beep: true,
    });

    jasmine.getEnv().addReporter(jcReporter);
  },

  onComplete() {
    allureReport();
    console.log(`WebdriverIO tests ran on ${new Date()} – All done!`);
  },

  // --inspect-brk to make selenium wait for user to open debug console in browser
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5859'],
};
