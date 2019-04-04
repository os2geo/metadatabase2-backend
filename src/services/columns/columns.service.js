// Initializes the `columns` service on path `/columns`
const createService = require('feathers-sequelize');
const createModel = require('../../models/columns.model');
const hooks = require('./columns.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/columns', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('columns');

  service.hooks(hooks);
};
