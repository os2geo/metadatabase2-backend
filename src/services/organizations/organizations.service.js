// Initializes the `organizations` service on path `/organizations`
const createService = require('feathers-sequelize');
const createModel = require('../../models/organizations.model');
const hooks = require('./organizations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('organizations');

  service.hooks(hooks);
};
