const organizations = require('./organizations');
const roles = require('./roles');
const users = require('./users');
module.exports = async app => {
  await app.configure(organizations);
  await app.configure(roles);
  await app.configure(users);
};
