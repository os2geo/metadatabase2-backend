// Initializes the `indices` service on path `/indices`
const createService = require('./mappings.class.js');
const hooks = require('./mappings.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mappings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('mappings');

  service.hooks(hooks);
};
