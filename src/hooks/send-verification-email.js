// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const accountService = require('../notifier');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function sendVerificationEmail (hook) {
    const user = hook.result;
    if (hook.params.provider && user) {
      accountService(hook.app).notifier('resendVerifySignup', user);
      return Promise.resolve(hook);
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
