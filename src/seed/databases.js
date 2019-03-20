const createService = require('feathers-sequelize');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const express = require('@feathersjs/express');
const logger = require('../logger');
module.exports = async app => {  
  const paginate = app.get('paginate'); 
  const sequelizeClient = app.get('sequelizeClient');
  try {
    await sequelizeClient.createSchema('data');
  }
  catch(err) {
    console.log('error creating schema', err);
  }
  /*
  const Model = sequelizeClient.define('rune', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    schema: 'data',   
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });
  const options = {
    Model,
    paginate
  };
  app.use('/runes', createService(options));
  app.use(express.notFound());
  app.use(express.errorHandler({ logger }));
  sequelizeClient.sync();
  */
  const serviceDatabases = app.service('databases');
  const databases = await serviceDatabases.find();
  databases.forEach(item => {
    if(item.schema) {
      const schema = {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4
        }
      };
      const Model = sequelizeClient.define(item.id.replace(/-/g,'_'), schema, {
        schema: 'data',   
        hooks: {
          beforeCount(options) {
            options.raw = true;
          }
        }
      });
      const options = {
        Model,
        paginate
      };
      app.use(`/${item.id}`, createService(options));
    }
  });
  app.use(express.notFound());
  app.use(express.errorHandler({ logger }));
  sequelizeClient.sync();
};