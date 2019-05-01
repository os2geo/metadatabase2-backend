// Initializes the `data` service on path `/data`
const createService = require('./es.class.js');
const hooks = require('./es.hooks');

module.exports = function (app) {
  const Model = app.get('esClient');
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/es/:database', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('es/:database');

  service.hooks(hooks);
};
