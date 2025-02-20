import { doesNotReject } from 'node:assert/strict';

import expect from 'expect';

import Zoom from 'core/clients/zoom';

import datetime from 'shared/libs/datetime';

import { config } from 'test/_env';

const zoom = Zoom(config);

describe('Zoom client', () => {
    describe('meetings', () => {
        let meetingId;

        it('gets meetings', async () => {
            const { meetings } = await zoom.meetings.list();

            expect(meetings).toBeAn(Array);
        });

        it('creates a meeting', async () => {
            const meeting = await zoom.meetings.create({
                topic: 'Test meeting',
                type: 2,
                start_time: datetime().add(1, 'day').toISOString(),
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

        it('gets a meeting', async () => {
            const meeting = await zoom.meetings.get(meetingId);

            expect(meeting).toExist();
        });

        it('updates a meeting', async () => {
            await doesNotReject(async () => {
                await zoom.meetings.update(meetingId, {
                    topic: 'Test meeting updated',
                    agenda: 'Test meeting agenda updated'
                });
            });
        });

        it('deletes a meeting', async () => {
            await doesNotReject(async () => {
                await zoom.meetings.delete(meetingId);
            });
        });
    });
});