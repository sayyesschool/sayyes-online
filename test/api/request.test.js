import expect from 'expect';

import request from 'api/request';

import { REQUEST } from 'test/_data';
import { context } from 'test/_env';

import setup from './api';

const api = setup('/request', request);

const {
    clients: { hh, mail, teams },
    models: { Request }
} = context;

describe('Public Request API', () => {
    after(async () => {
        await Request.deleteMany();
    });

    describe('POST /', () => {
        it('creates a request', async function() {
            this.timeout(5000);

            const { body: { data } } = await api.post('/request').send(REQUEST);

            expect(data).toExist();
            expect(data.hhid).toExist();
            expect(data.type).toBe(Request.Type.Call);
            expect(data.status).toBe(Request.Status.New);
            expect(data.channel).toBe(Request.Channel.Call);
            expect(data.source).toBe(Request.Source.Google);

            expect(hh.addStudyRequest).toHaveBeenCalled();
            expect(mail.send).toHaveBeenCalled();
            expect(teams.sendAdaptiveCard).toHaveBeenCalled();
        });
    });
});