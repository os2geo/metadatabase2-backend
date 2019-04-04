const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const usersGroupsBefore = require('../../src/hooks/users-groups-before');

describe('\'users-groups-before\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: usersGroupsBefore()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
