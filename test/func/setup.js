import db from '@/db';

export async function mochaGlobalSetup () {
    await db.connect('mongodb://localhost:27017/sayyes-test');
}

export async function mochaGlobalTeardown () {
    await db.drop();
    await db.disconnect();
}