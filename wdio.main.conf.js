const JasmineConsoleReporter = require('jasmine-console-reporter');
const allureReport = require('./webdriverIO/utils/allureReport');
require('dotenv').config();

exports.config = {
  // Config to run off of selenium server jar
  // runner: 'local',
  // services: ['selenium-standalone'],
  // port: 4444,
  // seleniumArgs: {
  //   host: '127.0.0.1',
  // },

  // Config to run using browser stack
  host: 'hub.browserstack.com',
  services: ['browserstack'],
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  browserstackLocal: true,

  specs: [],
  suites: {},

  logLevel: 'error',
  deprecationWarnings: true,
  sync: true,
  coloredLogs: true,
  screenshotPath: './screenshots',
  baseUrl: process.env.BASEURL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  framework: 'jasmine',

  // reporters: ['allure'],
  // reporterOptions: {
  //   outputDir: './',
  //   allure: {
  //     outputDir: 'report/allure-results',
  //   },
  // },

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

    console.log(capabilities);
  },

  before: () => {
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
    jasmine.getEnv().bailFast = () => {
      const env = this;
      env.afterEach(() => {
        if (!this.results().passed()) {
          env.specFilter = (spec) => {
            return false;
          };
        }
      });
    };
  },

  onComplete() {
    // allureReport();
    console.log(`WebdriverIO tests ran on ${new Date()} – All done!`);
  },

  // --inspect-brk to make selenium wait for user to open debug console in browser
  debug: true,
  execArgv: ['--inspect=127.0.0.1:5859'],
};
