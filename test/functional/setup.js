import config from '@/config';
import core from '@/core';
import db from '@/db';

global.console.error = () => {}; // suppress error logging for tests
global.$context = core(config);

export async function mochaGlobalSetup () {
    await db.connect('mongodb://localhost:27017/sayyes-test');
}

export async function mochaGlobalTeardown () {
    await db.drop();
    await db.disconnect();
}