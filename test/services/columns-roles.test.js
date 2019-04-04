const assert = require('assert');
const app = require('../../src/app');

describe('\'columns-roles\' service', () => {
  it('registered the service', () => {
    const service = app.service('columns-roles');

    assert.ok(service, 'Registered the service');
  });
});
