const config = require('../../src/config');
const db = require('../../src/db');
const core = require('../../src/core');

global.$context = core(config);

exports.mochaGlobalSetup = async function () {
    await db.connect('mongodb://localhost:27017/sayyes-test');
};

exports.mochaGlobalTeardown = async function () {
    await db.drop();
    await db.disconnect();
};