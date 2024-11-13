import { CronJob } from 'cron';
import moment from 'moment';

import config from './config';
import core from './core';

const { services: { Club } } = core(config);

new CronJob({
    cronTime: '0 0 9-21 * * *',
    onTick: async () => {
        const now = moment().utc().minutes(0).seconds(0).milliseconds(0);
        const inADay = now.add(1, 'day');
        const inAnHour = now.add(1, 'hour');

        Club.sendMeetingsReminders(inADay, { templateId: 1348661 });
        Club.sendMeetingsReminders(inAnHour, { templateId: 1348680 });
    },
    start: true
});