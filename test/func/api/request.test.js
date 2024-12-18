import expect from 'expect';

import request from '@/api/request';

import context from '../context';

import setup from './api';

const api = setup(request);

const {
    models: { Request }
} = context;

describe('Public Request API', () => {
    after(async () => {
        await Request.deleteMany();
    });

    describe('POST /', () => {
        it('creates a request', async () => {
            const { body: { data } } = await api.post('/').send({
                description: 'Test',
                channel: Request.Channel.Site,
                source: Request.Source.Google
            });

            expect(data).toExist();
            expect(data.description).toBe('Test');
            expect(data.status).toBe(Request.Status.New);
            expect(data.channel).toBe(Request.Channel.Site);
            expect(data.source).toBe(Request.Source.Google);
        });
    });
});