const mocha = require('mocha');
const assert = require('chai').assert;
require('dotenv').config();
const joi = require('joi');
const monk = require('monk');

let testRun = [];
let testID = -1;
let db_dev;
let db_prod;
let db_dev_connect = false;
let db_prod_connect = false;
let coll_test_drop = false;

describe('MONGODB CONNECTIVITY', async () => {
  let currentTestID = testID++;
  before(() => {
    testRun[currentTestID] = Date.now();
  });

  it('Connect to dev DB and drop connect collection', async () => {
    db_dev = await monk(process.env.MONGO_URI_DEV).then(async (db) => {
      db_dev_connect = true;
      const test_connect = db.get('test_connect');
      await test_connect.drop().then(() => {
        coll_test_drop = true;
      }, (error) => {
        console.log(error);
      });
      db.close();
    }, (error) => {
      console.log(error);
    });

    assert.isTrue(db_dev_connect, "connection to dev db successful");
    assert.isTrue(coll_test_drop, "dopping of connect_test collection successful");
  });

  it('Connect to prod DB', async () => {
    db_dev = await monk(process.env.MONGO_URI_PROD).then(async (db) => {
      db_prod_connect = true;
      db.close();
    }, (error) => {
      console.log(error);
    });

    assert.isTrue(db_prod_connect, "connection to dev db successful");
  });

  after(() => {
    testRun[currentTestID] = Date.now() - testRun[currentTestID];
    console.log(`MongoDB connectivity tests completed in ${testRun[currentTestID]} ms`);
  })
})
