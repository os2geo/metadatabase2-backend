const assert = require('assert');
const app = require('../../src/app');

describe('\'users-roles\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-roles');

    assert.ok(service, 'Registered the service');
  });
});
