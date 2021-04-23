const mocha = require('mocha');
const assert = require('chai').assert;
require('dotenv').config();

let testRun = [];
let testID = -1;

describe('STORAGE TESTS', () => {
  let currentTestID = testID++;
  before(() => {
    testRun[currentTestID] = Date.now();
  });

  it('MongoDB dev url set', () => {
    let dev_mongo_net = process.env.MONGO_URI_DEV.search('mongodb.net');
    let dev_localhost = process.env.MONGO_URI_DEV.search('localhost');
    let dev_127 = process.env.MONGO_URI_DEV.search('127.0.0.1');
    assert.exists(process.env.MONGO_URI_DEV, "dev DB url set");
    assert.isNotEmpty(process.env.MONGO_URI_DEV, "dev DB url not empty");
    assert.isTrue((dev_mongo_net + dev_localhost + dev_127 > -3), "dev url is of known MongoDB target");
  });
  it('MongoDB prod url set', () => {
    let prod_mongo_net = process.env.MONGO_URI_PROD.search('mongodb.net');
    let prod_localhost = process.env.MONGO_URI_PROD.search('localhost');
    let prod_127 = process.env.MONGO_URI_PROD.search('127.0.0.1');
    assert.exists(process.env.MONGO_URI_PROD, "prod DB url set");
    assert.isNotEmpty(process.env.MONGO_URI_PROD, "prod DB url not empty");
    assert.isTrue((prod_mongo_net + prod_localhost + prod_127 > -3), "prod url is of known MongoDB target");
  });

  after(() => {
    testRun[currentTestID] = Date.now() - testRun[currentTestID];
    console.log(`Storage tests completed in ${testRun[currentTestID]} ms`);
  })
})
