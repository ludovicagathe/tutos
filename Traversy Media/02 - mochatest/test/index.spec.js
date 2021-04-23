const assert = require('chai').assert;
const index = require('../index');

describe('App', () => {
  it('App should return hello', () => {
    assert.equal(index(), 'hello');
  });
});
