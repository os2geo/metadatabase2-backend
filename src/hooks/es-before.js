// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.params.query.hasOwnProperty('$sqs') && !context.params.query.$sqs.hasOwnProperty('$fields')) {
      context.params.query.$sqs.$fields = [];
    }
    if (context.params.query.hasOwnProperty('$distinct')) {
      context.params.query = {
        body: {
          size: 0,
          aggs: {
            values: {
              terms: {
                field: context.params.query.$distinct
              }
            }
          }
        }
      };
      const res = await context.service.raw(context.params);
      context.result = res;
    }
    return context;
  };
};
