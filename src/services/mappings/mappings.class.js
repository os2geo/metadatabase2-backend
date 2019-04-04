/* eslint-disable no-unused-vars */
const elasticsearch = require('elasticsearch');
const errors = require('@feathersjs/errors');
const { v4 } = require('uuid');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  apiVersion: '6.0'
});
class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return client.cat.indices({ format: 'json' });
  }

  async get (id, params) {
    const exists = await client.indices.exists({ index: id });
    if(!exists) {
      return new errors.NotFound();
    }
    return client.indices.get({ index: id });
  }

  async create (data, params) {
    const id = data.id || v4();
    const exists = await client.indices.exists({ index: id });
    if(!exists) {
      return client.indices.create({ index: id });
    }
    return client.indices.get({ index: id });
  }

  async update (id, data, params) {
    const exists = await client.indices.exists({ index: id });
    if(!exists) {
      return new errors.NotFound();
    }
    return client.indices.putMapping({
      index: id,
      type: 'docs',
      body: data
    });
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    const exists = await client.indices.exists({ index: id });
    if(!exists) {
      return new errors.NotFound();
    }
    return client.indices.delete({ index: id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
