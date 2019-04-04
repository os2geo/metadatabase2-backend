const assert = require('assert');
const app = require('../../src/app');

describe('\'indices\' service', () => {
  it('registered the service', () => {
    const service = app.service('indices');

    assert.ok(service, 'Registered the service');
  });
});
