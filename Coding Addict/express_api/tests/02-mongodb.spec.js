const mocha = require('mocha');
const assert = require('chai').assert;
require('dotenv').config();
const joi = require('joi');
const monk = require('monk');

const test_data = require('./test_data.json');
const user_schema = joi.object({
  id: joi.number().integer(),
  first_name: joi.string().trim().required(),
  last_name: joi.string().trim().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  gender: joi.string().trim(),
  ip_address: joi.string().ip({ version: ['ipv4', 'ipv6'], cidr: 'optional'})
});

let testRun = [];
let testID = -1;
let db_dev;
let db_prod;
let db_dev_connect = false;
let db_prod_connect = false;
let coll_test_drop = false;
let validated_data = {};
let insert_single_test_data = false;
let read_single_test_data = false;
let update_single_test_data = false;
let delete_single_test_data = false;
let insert_multiple_data = false;
let validate_single_data = false;

describe('MONGODB CONNECTIVITY', async () => {
  let currentTestID = testID++;
  before(() => {
    testRun[currentTestID] = Date.now();
  });

  it('Connect to dev DB and drop connect collection', async () => {
    db_dev = await monk(process.env.MONGO_URI_DEV).then(async (db) => {
      db_dev_connect = true;
      let test_connect = db.get('test_connect');
      await test_connect.drop().then(async () => {
        coll_test_drop = true;
        test_connect = db.create('test_connect');
        validated_data = await user_schema.validateAsync(test_data[0]).then(async (data) => {
          validate_single_data = true;
          let inserted_data = await test_connect.insert(data).then((doc) => {
            insert_single_test_data = true;
          }).catch((error) => {
            console.log(error);
          });
          let return_data = await test_connect.findOne({ id: 1 }, { fields: { _id: 0 }});
          if(return_data.id == data.id && return_data.first_name == data.first_name && return_data.last_name == data.last_name && return_data.email == data.email && return_data.gender == data.gender && return_data.ip_address == data.ip_address) {
            read_single_test_data = true;
          }
          let updated = await test_connect.update({ id : 1 }, { $set: { first_name: "Gilfoyl"}}).then((doc) => {
            if(doc.n == doc.ok == 1) {
              update_single_test_data = true;
            }
          }).catch((error) => {
            console.log(error);
          });
          let deleted = await test_connect.remove({ id: 1 }).then((data) => {
            if(data.deletedCount == 1) {
              delete_single_test_data = true;
            }
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });

      db.close();
    }, (error) => {
      console.log(error);
    });

    assert.isTrue(db_dev_connect, "connection to dev db successful");
    assert.isTrue(coll_test_drop, "dopping of connect_test collection successful");
    assert.isTrue(validate_single_data, "single document validated");
    assert.isTrue(insert_single_test_data, "inserted single document");
    assert.isTrue(read_single_test_data, "read single data successful");
    assert.isTrue(update_single_test_data, "update single data successful");
    assert.isTrue(delete_single_test_data, "delete single data successful");
  });

  it('Connect to prod DB', async () => {
    db_prod = await monk(process.env.MONGO_URI_PROD).then(async (db) => {
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
