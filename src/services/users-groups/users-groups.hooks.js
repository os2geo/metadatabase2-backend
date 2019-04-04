

const usersGroupsBefore = require('../../hooks/users-groups-before');
const getAfter = require('../../hooks/get-after');
module.exports = {
  before: {
    all: [],
    find: [usersGroupsBefore()],
    get: [usersGroupsBefore()],
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
