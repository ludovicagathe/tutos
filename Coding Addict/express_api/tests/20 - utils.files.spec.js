const mocha = require('mocha');
const assert = require('chai').assert;
require('dotenv').config();
const path = require('path');

const ftools = require('../utils/files');

describe('READ - Read JSON file and return Object', () => {
  it("Return an error if file is not provided", () => {
    let test = ftools.getJSON();
    assert.deepEqual(test, { error: true, message: "file not specified" }, "should not process without filename");
    assert.isTrue(test.error, "no file parameter specified yields an error")
  });

  it("Return an error if file parameter is not a string", () => {
    let test1 = ftools.getJSON({ file: "test", read: true });
    let test2 = ftools.getJSON(true);
    let test3 = ftools.getJSON(1);
    assert.deepEqual(test1, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
    assert.isTrue(test1.error, "non-string file parameter yields an error")
    assert.deepEqual(test2, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
    assert.deepEqual(test3, { error: true, message: "file parameter should be a string" }, "should not process if filename is not a string");
  });

  it("Return an error if file does not exist", () => {
    let test = ftools.getJSON('./scaramanga.json');
    assert.isTrue(test.error, "file not found yields an error");
    assert.deepEqual(test, { error: true, message: "file cannot be accessed or does not exist" }, "should return error object if file does not exist");
  });

  it("Read empty file and return empty object", () => {
    let test = ftools.getJSON('./tests/data/empty.json');
    assert.isUndefined(test.error, "empty file should not yield an error");
    assert.deepEqual(test, {}, "empty file should return empty object");
  });

  it("Read non-JSON data and return parse error", () => {

  });

  it("Read file and return object", () => {

  });

  it("Read primitive data and return value", () => {

  });
});

describe('WRITE - Write JSON file', () => {
  it("Detect undefined data and flag an error", () => {

  });

  it("Detect empty data and write empty object in file", () => {

  });

  it("Detect empty object data and write empty object in file", () => {

  });

  it("Detect invalid object string and flag an error", () => {

  });

  it("Write valid object string to file", () => {

  });

  it("Write valid object to file", () => {

  });
});

describe('UPDATE - Read JSON file and update', () => {
  it("Read empty file and return null object", () => {

  });

  it("Read empty file and return null object", () => {

  });

  it("Read empty file and return null object", () => {

  });

  it("Read empty file and return null object", () => {

  });
});
