const { CronJob } = require('cron');

const { services: { Meeting } } = require('./core');

new CronJob({
    cronTime: '0 0 9-21 * * *',
    onTick: () => Meeting.notifyRegistrants(),
    start: true
});