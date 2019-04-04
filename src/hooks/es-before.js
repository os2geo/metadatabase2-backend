// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.params.query.hasOwnProperty('$sqs') && !context.params.query.$sqs.hasOwnProperty('$fields')) {
      context.params.query.$sqs.$fields=[];
    }
    return context;
  };
};
