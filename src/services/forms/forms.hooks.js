const { authenticate } = require('@feathersjs/authentication').hooks;
const formsBefore = require('../../hooks/forms-before');
const getAfter = require('../../hooks/get-after');
const { disablePagination } = require('feathers-hooks-common');
module.exports = {
  before: {
    all: [ ],
    find: [authenticate('jwt'), disablePagination(), formsBefore()],
    get: [formsBefore()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
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
