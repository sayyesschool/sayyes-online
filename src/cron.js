import { CronJob } from 'cron';

import datetime from 'shared/libs/datetime';

import config from './config';
import core from './core';
import db from './db';

const { services: { Club } } = core(config);

new CronJob({
    cronTime: '0 */30 * * * *', // every 30 minutes
    start: true,
    onTick: async () => {
        console.log('Cron job running...');

        await db.connect(config.DB_CONNECTION_STRING);

        const now = datetime().utc().seconds(0).milliseconds(0);
        const hourBefore = now.clone().add(1, 'hour').toDate();
        const dayBefore = now.clone().add(1, 'day').toDate();

        await Club.sendMeetingsReminders({ startDate: hourBefore }, { templateId: 1348680 });
        await Club.sendMeetingsReminders({ startDate: dayBefore }, { templateId: 1348661 });

        await db.disconnect();

        console.log('Cron job finished...');
    }
});