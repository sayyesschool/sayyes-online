const Ftp = require('ftp-deploy');

const config = {
    user: 'sayyes_fed37',
    password: '.JwTAhLR2vpjq_K',
    host: 'sayyes.ftp.evennode.com',
    port: 21,
    localRoot: process.cwd() + '/public',
    remoteRoot: '/public',
    include: ['*', '**/*'], // this would upload everything except dot files
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    sftp: true
};

const ftp = new Ftp();

ftp.on('uploading', data => {
    console.log('Total file count being transferred', data.totalFilesCount);
    console.log('Number of files transferred', data.transferredFileCount);
    console.log('Uploading', data.filename);
});

ftp.on('log', data => {
    console.log(data);
});

ftp.on('error', error => {
    console.log('Error', error);
});

ftp.deploy(config)
    .then(res => console.log('Finished:', res))
    .catch(err => console.log('Error', err));