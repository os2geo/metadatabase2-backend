const { authenticate } = require('@feathersjs/authentication').hooks;
const formsBefore = require('../../hooks/forms-before');
const getAfter = require('../../hooks/get-after');
const { disablePagination } = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [disablePagination(), formsBefore()],
    get: [formsBefore()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
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
