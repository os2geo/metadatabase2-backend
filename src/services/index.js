const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const databases = require('./databases/databases.service.js');
const data = require('./data/data.service.js');
const projects = require('./projects/projects.service.js');
const columns = require('./columns/columns.service.js');
const groups = require('./groups/groups.service.js');
const usersGroups = require('./users-groups/users-groups.service.js');
const permissions = require('./permissions/permissions.service.js');
const roles = require('./roles/roles.service.js');
const es = require('./es/es.service.js');
const indices = require('./indices/indices.service.js');
const mappings = require('./mappings/mappings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(organizations);
  app.configure(databases);
  app.configure(data);
  app.configure(projects);
  app.configure(columns);
  app.configure(groups);
  app.configure(usersGroups);
  app.configure(permissions);
  app.configure(roles);
  app.configure(es);
  app.configure(indices);
  app.configure(mappings);
};
