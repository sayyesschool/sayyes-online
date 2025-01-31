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
        try {
            console.log('Cron job running...');

            await db.connect(config.DB_CONNECTION_STRING);

            await Club.sendMeetingsReminders();
            await Club.endMeetings();

            await db.disconnect();

            console.log('Cron job finished...');
        } catch (error) {
            console.error('Cron job failed:', error);
        }
    }
});

new CronJob({
    cronTime: '0 0 0 * * *', // every day at midnight
    start: true,
    onTick: async () => {
        try {
            console.log('Cron job running...');

            await db.connect(config.DB_CONNECTION_STRING);

            await Club.sendMembershipsReminders();
            await Club.endMemberships();

            await db.disconnect();

            console.log('Cron job finished...');
        } catch (error) {
            console.error('Cron job failed:', error);
        }
    }
});