import expect from 'expect';

import request from 'api/request';

import context from '../context';
import { REQUEST } from '../data';

import setup from './api';

const api = setup('/request', request);

const {
    models: { Request }
} = context;

describe('Public Request API', () => {
    after(async () => {
        await Request.deleteMany();
    });

    describe('POST /', () => {
        it('creates a request', async () => {
            const { body: { data, error } } = await api.post('/request').send(REQUEST);

            console.log(error);

            expect(data).toExist();
            expect(data.type).toBe(Request.Type.Call);
            expect(data.status).toBe(Request.Status.New);
            expect(data.channel).toBe(Request.Channel.Site);
            expect(data.source).toBe(Request.Source.Google);
        });

        it('adds a request to HH', async () => {
            const { body: { data } } = await api.post('/request').send(REQUEST);

            expect(data).toExist();
            expect(data.hhid).toExist();
        });
    });
});