const { argv } = require('yargs');

module.exports = class CustomArgs {
  constructor(environments) {
    this.environments = environments || null;
  }

  get argKeys() {
    return Object.keys(argv).slice(2);
  }

  processArgs() {
    this.argKeys.forEach((key) => {
      const arg = argv[key];

      switch (key.toLowerCase()) {
        case 'environment':
        case 'env':
          this.setClientEnvironment(arg);
          break;

        case 'br':
        case 'browser':
          this.setBrowser(arg);
          break;

        case 'username':
        case 'user':
          this.setUsername(arg);
          break;

        case 'password':
        case 'pass':
          this.setPassword(arg);
          break;

        case 'device':
          this.setMobileDevice(arg);
          break;

        case 'report':
        case 'allure':
          this.generateReport(key, arg);
          break;

        default:
          break;
      }
    });
  }

  setClientEnvironment(env) {
    let baseUrl;
    let apiUrl;

    switch (env.toLowerCase()) {
      case 'LOCAL':
      case 'local':
        baseUrl = this.environments.local.baseUrl;
        apiUrl = this.environments.local.apiUrl;

        break;

      case 'development':
      case 'DEV':
      case 'dev':
        baseUrl = this.environments.dev.baseUrl;
        apiUrl = this.environments.dev.apiUrl;
        break;

      case 'SIT':
      case 'sit':
        baseUrl = this.environments.sit.baseUrl;
        apiUrl = this.environments.sit.apiUrl;
        break;

      case 'STG':
      case 'stg':
      case 'STAGE':
      case 'stage':
        baseUrl = this.environments.stage.baseUrl;
        apiUrl = this.environments.stage.apiUrl;
        break;

      case 'PRE':
      case 'pre':
      case 'preprod':
        baseUrl = this.environments.pre.baseUrl;
        apiUrl = this.environments.pre.apiUrl;
        break;

      case 'PROD':
      case 'production':
      case 'prod':
        baseUrl = this.environments.prod.baseUrl;
        apiUrl = this.environments.prod.apiUrl;
        break;

      default:
        console.log(
          `${env} is not a valid environment. Please use one of the following (local, dev, stg, pre, prod)!`,
        );
        break;
    }

    process.env.ENV = env;
    process.env.BASEURL = baseUrl;
    process.env.API = apiUrl;

    return {
      baseUrl,
      apiUrl,
      env,
    };
  }

  setBrowser(arg) {
    const browsers = [
      'chrome',
      'firefox',
      'safari',
      'internet explorer',
      'iexplore',
      'android',
      'iPhone',
      'iPad',
      'headless',
    ];

    if (browsers.includes(arg.toLowerCase())) {
      this.setBrowserCapabilities(arg);
      process.env.BROWSER = arg;
    } else {
      console.error(`${arg} is not a valid browser.`);
    }
  }

  setBrowserCapabilities(arg) {
    const capabilities = {
      maxInstances: 1,
      browserName: arg,
    };

    let binaryPath;
    switch (process.platform) {
      case 'darwin':
        binaryPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        break;
      case 'linux':
        binaryPath = '/usr/bin/google-chrome';
        break;
      case 'win32':
        binaryPath = 'C:Program Files (x86)GoogleChromeApplicationchrome.exe';
        break;
      default:
        break;
    }

    switch (arg.toLowerCase()) {
      case 'headless':
        capabilities.browserName = 'chrome';
        capabilities.chromeOptions = {
          args: [
            'headless',
            'disable-gpu',
            'window-size=1920,1080',
            'no-sandbox',
            'disable-dev-shm-usage',
            'remote-debugging-port=9222',
          ],
          binary: binaryPath,
        };
        break;
      case 'chrome':
        capabilities.chromeOptions = {
          args: [
            'disable-gpu',
            'no-sandbox',
            'disable-dev-shm-usage',
          ],
        };
        break;
      case 'firefox':
        capabilities.marionette = true;
        capabilities['moz:firefoxOptions'] = {
          binary: "/usr/local/firefox/bin/firefox",
          args: ['-headless'],
        };
        break;
      case 'safari':
        capabilities.safariOptions = {};
        break;
      default:
        console.log(`${arg} is not a valid browser capability option!`);
        break;
    }

    process.env.CAPS = JSON.stringify(capabilities);
    return capabilities;
  }

  setUsername(username) {
    process.env.USER = username;
  }

  setPassword(password) {
    process.env.PASS = password;
  }

  setMobileDevice(device) {
    const devices = [
      'iPhone X',
      'iPhone 8',
      'iPhone 7',
      'Pixel 2',
      'Pixel 2 XL',
    ];

    if (devices.includes(device)) {
      process.env.DEVICE = device;
    } else {
      console.warn(`${device} is not a valid device.`);
    }
  }

  generateReport(key, arg) {
    if (key) process.env.REPORT = true;
    if (arg === 'open') process.env.OPENREPORT = true;
  }
};
