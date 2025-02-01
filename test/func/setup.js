import DB from 'db';

import context from './context';

const db = DB(context);

export async function mochaGlobalSetup () {
    await db.connect();
    await db.drop();
}

export async function mochaGlobalTeardown () {
    await db.drop();
    await db.disconnect();
}