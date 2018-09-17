exports.envConfig = (environment) => {
  const env = environment || process.env.ENV;
  switch (env) {
    case 'LOCAL':
    case 'local':
      this.url = 'http://localhost:8080';
      this.apiKey = '';
      break;
    default:
      console.log('Invalid env specified.');
      break;
  }
  console.log(`url: ${this.url}`);
  return { url: this.url, apiKey: this.apiKey };
};
