const organizations = require('./organizations');
module.exports = app => {
  app.configure(organizations);  
};