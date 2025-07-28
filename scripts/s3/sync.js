import rclone from 'rclone.js';

const [,, src = 'yandex-cloud:sayyesonline-dev', dest = 'reg-cloud:sayyes-dev'] = process.argv;

const ls = rclone.sync(src, dest, {
    // 'dry-run': true,
    progress: true
});

ls.stdout.on('data', data => {
    console.log(data.toString());
});

ls.stderr.on('data', data => {
    console.error(data.toString());
});