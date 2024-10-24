import { execSync } from 'node:child_process';

const {
    DB_CONNECTION_STRING,
    DB_NAME
} = process.env;
const date = process.argv[2];
const dbName = process.argv[3];

if (!date)
    throw new Error('No backup date provided');

const command = [
    'mongorestore',
    `--uri=${DB_CONNECTION_STRING}`,
    dbName && `--nsFrom='${DB_NAME}.*' --nsTo='${dbName}.*'`,
    `./backups/${date}`
].filter(Boolean).join(' ');

console.log(command);

execSync(command);

// // mongorestore --host 11b.mongo.evennode.com --port 27018 --username c9b42705615495952426f3af0e1510f9 --password 4R*I78UXfKscHvIk --authenticationDatabase c9b42705615495952426f3af0e1510f9 --nsFrom='1fad2999e128c7779c8692d685e5eaad.*' --nsTo='c9b42705615495952426f3af0e1510f9.*'