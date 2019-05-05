const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const commonHooks = require('feathers-hooks-common');
const { disablePagination } = require('feathers-hooks-common');
const usersBeforeCreate = require('../../hooks/users-before-create');
const usersBeforePatch = require('../../hooks/users-before-patch');
const usersAfter = require('../../hooks/users-after');
const usersBefore = require('../../hooks/users-before');
const usersRestrict = require('../../hooks/users-restrict');
const { hashPassword } = require('@feathersjs/authentication-local').hooks;
const sendVerificationEmail = require('../../hooks/send-verification-email');
module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), disablePagination(), usersBefore() ],
    get: [ authenticate('jwt'), usersBefore() ],
    create: [hashPassword(), commonHooks.iff(commonHooks.isProvider('external'), authenticate('jwt'), usersBeforeCreate(), verifyHooks.addVerification())],
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(commonHooks.isProvider('external'), authenticate('jwt'), usersBeforePatch(), commonHooks.preventChanges(
        'email',
        'isVerified',
        'verifyToken',
        'verifyShortToken',
        'verifyExpires',
        'verifyChanges',
        'resetToken',
        'resetShortToken',
        'resetExpires'
      ))
    ],
    remove: [authenticate('jwt'), usersRestrict()]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password', 'verifyExpires', 'resetExpires', 'verifyChanges')
      )
    ],
    find: [],
    get: [],
    create: [
      commonHooks.iff(commonHooks.isProvider('external'),sendVerificationEmail()),
      commonHooks.iff(commonHooks.isProvider('external'),verifyHooks.removeVerification()),
      usersAfter()
    ],
    update: [usersAfter()],
    patch: [usersAfter()],
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
