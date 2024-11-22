import Ftp from 'ftp-deploy';

import credentials from './credentials.js';

const stand = process.argv[2];
const include = process.argv[3];

const config = Object.assign(credentials[stand], {
    port: 21,
    localRoot: process.cwd(),
    remoteRoot: '/',
    include: [include ? `public/**/${include}` : 'public/**/*'],
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    sftp: false
});

const ftp = new Ftp();

ftp.on('uploaded', data => {
    console.log(`Uploaded ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
});

ftp.on('log', data => {
    console.log('Log', data);
});

ftp.on('upload-error', error => {
    console.log('Error', error);
});

ftp.deploy(config)
    .then(res => console.log('Finished uploading'))
    .catch(err => console.log('Error uploading', err));