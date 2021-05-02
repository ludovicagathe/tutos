const mocha = require('mocha');
const assert = require('chai').assert;
require('dotenv').config();
const path = require('path');

const ftools = require('../utils/files');
let peek_mode = true;

describe('READ - Read JSON file and return Object', () => {
  it("Return an error if file is not provided", () => {
    let test = ftools.getJSON();
    if(peek_mode) { console.log(test) }
    assert.deepEqual(test, { error: true, message: "file not specified" }, "should not process without filename");
    assert.isTrue(test.error, "no file parameter specified yields an error")
  });

  it("Return an error if file parameter is not a string", () => {
    let test1 = ftools.getJSON({ file: "test", read: true });
    let test2 = ftools.getJSON(true);
    let test3 = ftools.getJSON(1);
    if(peek_mode) { console.log(test1, test2, test3 ) }
    assert.deepEqual(test1, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
    assert.isTrue(test1.error, "non-string file parameter yields an error")
    assert.deepEqual(test2, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
    assert.deepEqual(test3, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
  });

  it("Return an error if file does not exist", () => {
    let test = ftools.getJSON('./scaramanga.json');
    if(peek_mode) { console.log(test) }
    assert.isTrue(test.error, "file not found yields an error");
    assert.deepEqual(test, { error: true, message: "file cannot be accessed or does not exist" }, "should return error object if file does not exist");
  });

  it("Read empty file and return empty object", () => {
    let test = ftools.getJSON('./tests/data/empty.json');
    if(peek_mode) { console.log(test) }
    assert.isUndefined(test.error, "empty file should not yield an error");
    assert.deepEqual(test, {}, "empty file should return empty object");
  });

  it("Read non-JSON data and return parse error", () => {
    let test = ftools.getJSON('./tests/data/non_json.json');
    if(peek_mode) { console.log(test) }
    assert.isTrue(test.error, "malformed JSON should yield an error");
    assert.deepEqual(test, { error: true, message: "data in file is invalid or corrupted" }, "malformed JSON in file yields an error");
  });

  it("Read file and return object", () => {
    let test = ftools.getJSON("./tests/data/single_object.json");
    if(peek_mode) { console.log(test) }
    assert.isUndefined(test.error, "valid JSON returned successfully");
  });

  it("Read primitive data and return value", () => {
    let test_string = ftools.getJSON('./tests/data/single_string.json');
    let test_boolean = ftools.getJSON('./tests/data/single_boolean.json');
    let test_date = ftools.getJSON('./tests/data/single_date.json');
    let test_array = ftools.getJSON('./tests/data/single_array.json');
    if(peek_mode) { console.log(test_string,test_boolean,test_date,test_array) }

    assert.isUndefined(test_string.error, "get string file returns no error");
    assert.equal(test_string, "This is a string", "string retrieved successfully");
    assert.isUndefined(test_boolean.error, "get boolean file returns no error");
    assert.strictEqual(test_boolean, true, "boolean retrieved successfully");
    assert.isUndefined(test_date.error, "get date file returns no error");
    assert.strictEqual(test_date.toString(), new Date('2021-05-02T19:47:59.918Z').toString(), "date retrieved successfully");
    assert.isUndefined(test_array.error, "get array file returns no error");
    assert.deepEqual(test_array, [1,2,3,'a',"test",{x:'a'},{}], "malformed JSON in file yields an error");
  });
});

// describe('WRITE - Write JSON file', () => {
//   it("Detect undefined data and flag an error", () => {
//
//   });
//
//   it("Detect empty data and write empty object in file", () => {
//
//   });
//
//   it("Detect empty object data and write empty object in file", () => {
//
//   });
//
//   it("Detect invalid object string and flag an error", () => {
//
//   });
//
//   it("Write valid object string to file", () => {
//
//   });
//
//   it("Write valid object to file", () => {
//
//   });
// });
//
// describe('UPDATE - Read JSON file and update', () => {
//   it("Read empty file and return null object", () => {
//
//   });
//
//   it("Read empty file and return null object", () => {
//
//   });
//
//   it("Read empty file and return null object", () => {
//
//   });
//
//   it("Read empty file and return null object", () => {
//
//   });
// });
