const email = require('./email/email.service.js');
const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const databases = require('./databases/databases.service.js');
const groups = require('./groups/groups.service.js');
const usersGroups = require('./users-groups/users-groups.service.js');
const roles = require('./roles/roles.service.js');
const es = require('./es/es.service.js');
const indices = require('./indices/indices.service.js');
const forms = require('./forms/forms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(email);
  app.configure(users);
  app.configure(organizations);
  app.configure(databases);
  app.configure(groups);
  app.configure(usersGroups);
  app.configure(roles);
  app.configure(es);
  app.configure(indices);
  app.configure(forms);
};
