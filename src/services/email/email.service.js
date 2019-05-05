// Initializes the `email` service on path `/email`
const Mailer = require('feathers-mailer');
const hooks = require('./email.hooks');
// const nodemailer = require('nodemailer');

module.exports = function (app) {
  const options = app.get('mail');
  // console.log('mail options', options);
  // const transport = nodemailer.createTransport(options);
  // Initialize our service with any options it requires
  app.use('/email', Mailer(options));
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email');

  service.hooks(hooks);
};
