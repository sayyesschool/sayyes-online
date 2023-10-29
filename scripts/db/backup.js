const { execSync } = require('node:child_process');

const { DB_CONNECTION_STRING } = process.env;

const date = new Date().toISOString().slice(0, 10);
const result = execSync(`mongodump --uri=${DB_CONNECTION_STRING} --out=./backups/${date}`);

console.log('DB was successfully dumped', result.toString('utf8'));