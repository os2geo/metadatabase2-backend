const { authenticate } = require('@feathersjs/authentication').hooks;
const esBefore = require('../../hooks/es-before');
const { disablePagination } = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [],
    find: [disablePagination(), esBefore()],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
