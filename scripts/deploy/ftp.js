import Ftp from 'ftp-deploy';

const include = process.argv[3];
const {
    FTP_HOST,
    FTP_USER,
    FTP_PASSWORD
} = process.env;

const config = {
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    port: 21,
    localRoot: process.cwd(),
    remoteRoot: '/',
    include: [include ? `public/**/${include}` : 'public/**/*'],
    deleteRemote: false,
    forcePasv: true, // Passive mode is forced (EPSV command is not sent)
    sftp: false
};

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