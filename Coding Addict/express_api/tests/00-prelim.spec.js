const mocha = require('mocha');
const assert = require('chai').assert;
// const supertest = require('supertest');
// const app = require('../index.js');
require('dotenv').config();

let testRun = [];
let testID = -1;
let modes = ['prod', 'dev'];

describe('PRELIMINARY TESTS', () => {
  let currentTestID = testID++;
  before(() => {
    testRun[currentTestID] = Date.now();
  });

  it('Test environment', () => {
    assert.isTrue(process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'prod', "Environment is not set");
  });
  it('Port defined', () => {
    assert.isNumber(parseInt(process.env.PORT), `Port is not set`);
  });
  it('NEDB support setting', () => {
    assert.isTrue(process.env.NEDB_SUPPORT === '1' || process.env.NEDB_SUPPORT === '0');
  });
  it('Redis support setting', () => {
    assert.isTrue(process.env.REDIS_SUPPORT === '1' || process.env.REDIS_SUPPORT === '0');
  });

  after(() => {
    testRun[currentTestID] = Date.now() - testRun[currentTestID];
    console.log(`Preliminary tests completed in ${testRun[currentTestID]} ms`);
  })
})
