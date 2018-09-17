module.exports = function waitForAsync(promise, timer) {
  let response;
  const timeout = timer || 10000;

  promise
    .then((result) => {
      response = result;
      return result;
    })
    .catch((error) => {
      response = error;
      console.error(error);
    });

  browser.waitUntil(() => response, timeout, 'Promise failed to resolve');

  return response;
};
