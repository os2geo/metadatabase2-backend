/* eslint-disable no-unused-vars */
const createService = require('feathers-sequelize');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

class Service {
  constructor(options) {
    this.options = options || {};
    this.services = {};
  }

  async find(params) {
    const service = await this.getService(params.route.database);
    return service.find(params);
  }

  async get(id, params) {
    const service = await this.getService(params.route.database);
    return service.get(id, params);
  }

  async create(data, params) {
    const service = await this.getService(params.route.database);
    return service.create(data, params);
  }

  async update(id, data, params) {
    const service = await this.getService(params.route.database);
    return service.update(id, data, params);
  }

  async patch(id, data, params) {
    const service = await this.getService(params.route.database);
    return service.patch(id, data, params);
  }

  async remove(id, params) {
    const service = await this.getService(params.route.database);
    return service.remove(id, params);
  }
  setup(app) {
    this.app = app;
  }
  createSchema(node, schema) {
    let required = [];
    Object.keys(node).forEach(key => {
      const subnode = node[key];
      if (key === 'geometry') {
        schema[key] = {
          type: DataTypes.GEOMETRY
        };
      }
      if (key === 'properties') {
        schema = this.createSchema(node[key], schema);
      }
      if (key[0] !== '_' && key !== 'id') {
        if (subnode.type === 'string') {
          schema[key] = {
            type: DataTypes.TEXT
          };
        }
        if (subnode.type === 'number') {
          schema[key] = {
            type: DataTypes.REAL
          };
        }
        if (subnode.type === 'integer') {
          schema[key] = {
            type: DataTypes.INTEGER
          };
        }
        if (subnode.type === 'boolean') {
          schema[key] = {
            type: DataTypes.BOOLEAN
          };
        }
      }
    });
    if (node.required) {
      node.required.forEach(key => {
        if (schema.hasOwnProperty(key)) {
          schema[key].allowNull = false;
        }
      });
    }
    return schema;
  }
  async getService(id) {
    if (this.services.hasOwnProperty(id)) {
      return this.services[id];
    }
    const database = await this.app.service('databases').get(id);
    const sequelizeClient = this.app.get('sequelizeClient');
    let schema = {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      }
    };
    schema = this.createSchema(database.schema, schema);
    const name = id.replace(/-/g, '_');
    const Model = sequelizeClient.define(name, schema, {
      schema: 'data',
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });
    const options = {
      Model,
      paginate: false
    };
    const service = createService(options);
    this.services[id] = service;
    await sequelizeClient.createSchema('data');
    await sequelizeClient.sync();
    return service;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
