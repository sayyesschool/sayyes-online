import { writeFile } from 'fs/promises';
import { createCA, createCert } from 'mkcert';

const ca = await createCA({
    organization: 'CA',
    countryCode: 'RU',
    state: 'Moscow',
    locality: 'Moscow',
    validity: 365
});

const cert = await createCert({
    ca: { key: ca.key, cert: ca.cert },
    domains: ['127.0.0.1', 'localhost', 'sayyes.local'],
    validity: 365
});

const basePath = `${process.cwd()}/ssl`;

await Promise.all([
    writeFile(`${basePath}/local.key`, cert.key),
    writeFile(`${basePath}/local.cert`, cert.cert)
]);