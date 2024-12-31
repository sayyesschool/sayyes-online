import expect from 'expect';

import test from '@/api/test';

import { mock } from '../../helpers';
import context from '../context';
import { TEST_RESULTS } from '../data';

import setup from './api';

const api = setup('/test', test);

const {
    models: { Request },
    services: { Mail }
} = context;

mock.method(Mail, 'send', async () => {});
mock.method(Mail, 'sendMany', async () => {});

describe('Public Test API', () => {
    after(async () => {
        await Request.deleteMany();
    });

    describe('POST /', () => {
        it('evaluates a test', async () => {
            const { body: { data } } = await api.post('/test').send(TEST_RESULTS);

            expect(data).toExist();
            expect(data.requestId).toExist();
        });
    });
});