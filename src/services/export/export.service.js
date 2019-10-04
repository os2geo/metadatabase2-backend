// Initializes the `data` service on path `/data`
const createService = require('./export.class.js');
const hooks = require('./export.hooks');

module.exports = function (app) {
  const Model = app.get('esClient');
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/export/:database/:type', createService(options), (req, res) => {
    if(req.params.type==='excel') {
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
    res.send(res.data);
  });
  // Get our initialized service so that we can register hooks
  const service = app.service('export/:database/:type');

  service.hooks(hooks);
};
