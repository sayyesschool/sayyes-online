const Ftp = require('ftp-deploy');

const config = {
    host: 'sayyes.ftp.evennode.com',
    port: 21,
    user: 'sayyes_fed37',
    password: '2FQ7uH!vqefbQ:B',
    localRoot: process.cwd(),
    remoteRoot: '/',
    include: ['public/**/*'],
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    sftp: false
};

const ftp = new Ftp();

ftp.on('uploaded', data => {
    console.log(`Uploading ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
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