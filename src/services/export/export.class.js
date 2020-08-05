/* eslint-disable no-unused-vars */
const XLSX = require('xlsx');
const createService = require('feathers-elasticsearch');

class Service {
  constructor(options) {
    this.options = options || {};
    this.services = {};
  }

  async find(params) {
    const service = await this.getService(params.route.database);
    let data = [];
    let res = await service.find({
      query: {
        $sort: { _id: 1 }
      }
    });
    data = [...data, ...res.data];
    while (res.total > res.skip + res.limit) {
      res = await service.find({
        query: {
          $skip: res.limit + res.skip,
          $sort: { _id: 1 }
        }
      });
      data = [...data, ...res.data];
    }
    data.forEach(item =>{
      delete item._meta;
    });
    if(params.route.type === 'excel') {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ark 1');
      return XLSX.write(wb, { bookType:'xlsx', type:'buffer' });
    }
    if(params.route.type === 'geojson') {
      return {
        type: 'FeatureCollection',
        features: data.map(item => {
          return {
            type: 'Feature',
            properties: item
          };
        })
      };
    }
    return data;
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
  async raw(params) {
    const service = await this.getService(params.route.database);
    return service.raw('search', params.query);
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
