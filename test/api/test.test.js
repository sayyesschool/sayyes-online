import expect from 'expect';

import test from 'api/test';

import { TEST, TEST_RESULTS } from 'test/_data';
import { context } from 'test/_env';

import setup from './api';

const api = setup('/test', test);

const {
    clients: { mail },
    models: { Data, Request }
} = context;

describe('Public Test API', () => {
    before(async () => {
        await Data.create({ key: 'test', value: TEST });
    });

    after(async () => {
        await Request.deleteMany();
        await Data.deleteMany();
    });

    describe('POST /', () => {
        it('evaluates a test', async () => {
            const { body: { data } } = await api.post('/test').send(TEST_RESULTS);

            expect(data).toExist();
        });

        it('sends an mail', async () => {
            await api.post('/test').send(TEST_RESULTS);

            expect(mail.send).toHaveBeenCalled();
        });

        it('creates a request', async () => {
            const { body: { data: { requestId } } } = await api.post('/test').send(TEST_RESULTS);

            const request = await Request.findById(requestId);

            expect(request).toExist();
            expect(request.channel).toEqual(Request.Channel.Email);
            expect(request.contact).toExist();
            expect(request.contact.name).toEqual(TEST_RESULTS.name);
            expect(request.contact.email).toEqual(TEST_RESULTS.email);
            expect(request.utm).toExist();
            expect(request.utm.source).toEqual(TEST_RESULTS.utm.source);
            expect(request.utm.medium).toEqual(TEST_RESULTS.utm.medium);
            expect(request.utm.campaign).toEqual(TEST_RESULTS.utm.campaign);
            expect(request.utm.term).toEqual(TEST_RESULTS.utm.term);
            expect(request.utm.content).toEqual(TEST_RESULTS.utm.content);
            expect(request.data).toExist();
            expect(request.data.level).toExist();
            expect(request.data.goal).toExist();
        });
    });
});