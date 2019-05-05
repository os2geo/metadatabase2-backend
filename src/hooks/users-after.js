// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const user = await context.app.service('/users').get(context.result.id);
    context.result = user;
    return context;
  };
};
