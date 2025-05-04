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

            await Club.endMeetings();
            await Club.sendMeetingsReminders();

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

            await db.connect();

            await Club.endMemberships();
            // await Club.sendMembershipsReminders();

            await db.disconnect();

            console.log('Cron job finished...');
        } catch (error) {
            console.error('Cron job failed:', error);
        }
    }
});