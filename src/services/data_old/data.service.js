// Initializes the `data` service on path `/data`
const createService = require('./data.class.js');
const hooks = require('./data.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/data/:database', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('data/:database');

  service.hooks(hooks);
};
