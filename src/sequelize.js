const Sequelize = require('sequelize');
//const seed = require('./seed');
module.exports = function (app) {
  const connectionString = app.get('postgres');
  console.log('sequelize', connectionString);
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false, //console.log,
    operatorsAliases: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync().then(() => {
      //app.configure(seed);
    });

    return result;
  };
};
