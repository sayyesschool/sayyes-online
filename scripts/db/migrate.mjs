import { execSync } from 'node:child_process';

const date = process.argv[2];
const dbConnectionStringFrom = process.argv[3];
const dbNameFrom = process.argv[4];
const dbNameTo = process.argv[5];

if (!date)
    throw new Error('No backup date provided');

const command = [
    'mongorestore',
    `--uri=${dbConnectionStringFrom}`,
    `--nsFrom='${dbNameFrom}.*' --nsTo='${dbNameTo}.*'`,
    `./backups/${date}`
].filter(Boolean).join(' ');

execSync(command);

// // mongorestore --host 11b.mongo.evennode.com --port 27018 --username c9b42705615495952426f3af0e1510f9 --password 4R*I78UXfKscHvIk --authenticationDatabase c9b42705615495952426f3af0e1510f9 --nsFrom='1fad2999e128c7779c8692d685e5eaad.*' --nsTo='c9b42705615495952426f3af0e1510f9.*'