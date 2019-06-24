const { authenticate } = require('@feathersjs/authentication').hooks;
const { disablePagination } = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), disablePagination()],
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
