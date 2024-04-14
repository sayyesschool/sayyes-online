import { CronJob } from 'cron';

import config from './config';
import core from './core';

const { services: { Meeting } } = core(config);

new CronJob({
    cronTime: '0 0 9-21 * * *',
    onTick: () => Meeting.notifyRegistrants(),
    start: true
});