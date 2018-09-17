const { exec, execSync } = require('child_process');

module.exports = function allureReport() {
  if (process.env.REPORT) {
    const allure = 'node_modules/.bin/allure';
    const generateReport = `${allure} generate report/allure-results --clean -o report/allure-report`;
    execSync(generateReport);

    if (process.env.OPENREPORT) {
      const openReport = `${allure} open report/allure-report &`;
      exec(openReport, (error, stdout, stderr) => {
        if (error) console.error(`exec error: ${error}`);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    }
  }
};
