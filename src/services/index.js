const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const databases = require('./databases/databases.service.js');
const data = require('./data/data.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(organizations);
  app.configure(databases);
  app.configure(data);
};
