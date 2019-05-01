/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const { v4 } = require('uuid');
class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return this.options.Model.cat.indices({ format: 'json' });
  }

  async get (id, params) {
    const exists = await this.options.Model.indices.exists({ index: id });
    if(!exists) {
      return new errors.NotFound();
    }
    return this.options.Model.indices.get({ index: id });
  }

  async create (data, params) {
    const id = data.id || v4();
    const exists = await this.options.Model.indices.exists({ index: id });
    if(!exists) {
      return this.options.Model.indices.create({ index: id });
    }
    return this.options.Model.indices.get({ index: id });
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    const exists = await this.options.Model.indices.exists({ index: id });
    if(!exists) {
      return new errors.NotFound();
    }
    return this.options.Model.indices.delete({ index: id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
