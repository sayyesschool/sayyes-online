import { CronJob } from 'cron';

import config from './config';
import core from './core';
import DB from './db';

const { services: { Club } } = core(config);
const db = DB(config);

new CronJob({
    cronTime: '0 */30 * * * *', // every 30 minutes
    start: true,
    onTick: async () => {
        try {
            console.log('Cron job running...');

            await db.connect();

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