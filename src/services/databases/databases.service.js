// Initializes the `databases` service on path `/databases`
const createService = require('feathers-sequelize');
const createModel = require('../../models/databases.model');
const hooks = require('./databases.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/databases', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('databases');

  service.hooks(hooks);
};
