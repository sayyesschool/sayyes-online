import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';

const { DB_CONNECTION_STRING: uri } = process.env;

const path = process.argv[2];

if (!path) throw new Error('Path is required');

let dir;
let files = [];

if (extname(path) === '.json') {
    dir = dirname(path);
    files.push(basename(path));
} else {
    dir = path;
    files = readdirSync(path).filter(file => extname(file) === '.json');
}

if (!dir) throw new Error('Directory is required');
if (!files.length) throw new Error('No JSON files found');

for (const file of files) {
    const collection = basename(file, '.json');

    execSync(`mongoimport --uri=${uri} --collection=${collection} --file=${join(dir, file)} --jsonArray`);

    console.log(`Collection ${collection} was successfully imported`);
}