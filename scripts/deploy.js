const Ftp = require('ftp-deploy');

const include = process.argv[2];
const stand = process.argv[3];

const credentials = {
    dev: {
        host: 'sayyesonline.ftp.evennode.com',
        user: 'sayes-online_d76e6',
        password: 'j6sfgwPJ-.pX!zx'
    },
    prod: {
        host: 'sayyes.ftp.evennode.com',
        user: 'sayyes_fed37',
        password: '2FQ7uH!vqefbQ:B'
    }
};

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