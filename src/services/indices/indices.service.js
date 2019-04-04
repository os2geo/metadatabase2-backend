// Initializes the `indices` service on path `/indices`
const createService = require('./indices.class.js');
const hooks = require('./indices.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/indices', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('indices');

  service.hooks(hooks);
};
