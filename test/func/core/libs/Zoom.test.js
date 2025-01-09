import { doesNotReject } from 'node:assert/strict';

import expect from 'expect';
import moment from 'moment-timezone';

import Zoom from '@/core/libs/zoom/index.js';

const zoom = Zoom({
    accountId: global.$context.config.ZOOM_ACCOUNT_ID,
    clientId: global.$context.config.ZOOM_CLIENT_ID,
    clientSecret: global.$context.config.ZOOM_CLIENT_SECRET
});

describe('Zoom client', () => {
    describe('refreshToken', () => {
        it('should get and save a token', async () => {
            await zoom.refreshToken();
        });
    });

    describe('meetings', () => {
        let meetingId;

        it('should get meetings', async () => {
            const { meetings } = await zoom.meetings.list();

            expect(meetings).toBeAn(Array);
        });

        it('should create meeting', async () => {
            const meeting = await zoom.meetings.create({
                topic: 'Test meeting',
                type: 2,
                start_time: moment().add(1, 'day').toISOString(),
                duration: 60,
                timezone: 'Europe/Moscow',
                password: '123456',
                agenda: 'Test meeting agenda',
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: false,
                    mute_upon_entry: true,
                    watermark: false,
                    use_pmi: false,
                    approval_type: 0,
                    registration_type: 2,
                    audio: 'both',
                    auto_recording: 'none',
                    alternative_hosts: ''
                }
            });

            meetingId = meeting.id;

            expect(meeting).toExist();
        });

        it('should get meeting', async () => {
            const meeting = await zoom.meetings.get(meetingId);

            expect(meeting).toExist();
        });

        it('should update meeting', async () => {
            await doesNotReject(async () => {
                await zoom.meetings.update(meetingId, {
                    topic: 'Test meeting updated',
                    agenda: 'Test meeting agenda updated'
                });
            });
        });

        it('should delete meeting', async () => {
            await doesNotReject(async () => {
                await zoom.meetings.delete(meetingId);
            });
        });
    });
});