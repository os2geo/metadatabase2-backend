const assert = require('assert');
const app = require('../../src/app');

describe('\'columns\' service', () => {
  it('registered the service', () => {
    const service = app.service('columns');

    assert.ok(service, 'Registered the service');
  });
});
