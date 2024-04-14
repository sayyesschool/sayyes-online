import config from '../../src/config.js';
import core from '../../src/core/index.js';
import db from '../../src/db.js';

global.$context = core(config);

export async function mochaGlobalSetup () {
    await db.connect('mongodb://localhost:27017/sayyes-test');
}

export async function mochaGlobalTeardown () {
    await db.drop();
    await db.disconnect();
}