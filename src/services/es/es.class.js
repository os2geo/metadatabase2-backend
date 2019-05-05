/* eslint-disable no-unused-vars */
const createService = require('feathers-elasticsearch');

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

  async getService(id) {
    if (this.services.hasOwnProperty(id)) {
      return this.services[id];
    }

    const exists = await this.options.Model.indices.exists({ index: id });
    if(!exists) {
      const res = await this.options.Model.indices.create({ index: id });
      console.log(res);
    }
    const service = createService({
      multi: true,
      Model: this.options.Model,
      paginate: this.app.get('paginate'),
      elasticsearch: {
        index: id,
        type: 'docs'
      },
      esVersion: '6.0'
    });
    this.services[id] = service;
    return service;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
