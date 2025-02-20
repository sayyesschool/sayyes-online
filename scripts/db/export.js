import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { join } from 'node:path';

const { DB_CONNECTION_STRING: uri } = process.env;

const collection = process.argv[2];
const path = process.argv[3] ?? `./backups/${new Date().toISOString().slice(0, 10)}`;

if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
}

execSync(`mongoexport --uri=${uri} --collection=${collection} --out=${join(path, `${collection}.json`)} --jsonArray`);

console.log(`Collection ${collection} was successfully exported`);