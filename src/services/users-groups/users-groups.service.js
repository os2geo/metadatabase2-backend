// Initializes the `users-roles` service on path `/users-roles`
const createService = require('feathers-sequelize');
const createModel = require('../../models/users-groups.model');
const hooks = require('./users-groups.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    multi: true,
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users-groups', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users-groups');

  service.hooks(hooks);
};
