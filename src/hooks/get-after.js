// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    if(Array.isArray(context.result)) {
      context.result = await context.service.find({
        query: {
          id: context.result.map(item => item.id)
        }
      });
      return context;
    }
    context.result = await context.service.get(context.result.id);
    return context;
  };
};
