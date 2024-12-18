import expect from 'expect';

import { createId, mock, toJSON } from '../../helpers';
import context from '../context';
import { DEFAULT_MEMBERSHIP, USER_ID } from '../data';

import api from './api';

const {
    models: { Membership, User },
    services: { Mail }
} = context;

mock.method(Mail, 'send', async () => {});
mock.method(Mail, 'sendMany', async () => {});

describe('Club Memberships API', () => {
    after(async () => {
        await Membership.deleteMany();
        await User.deleteMany();
    });

    describe('GET /', () => {
        it('returns latest membership', async () => {
            const membership = await Membership.create({
                ...DEFAULT_MEMBERSHIP,
                userId: USER_ID
            });

            const { body } = await api.get('/memberships/my');

            expect(body.data).toMatch(toJSON(membership));
        });

        it('returns a membership by id', async () => {
            const membership = await Membership.create(DEFAULT_MEMBERSHIP);

            const { body } = await api.get(`/memberships/${membership.id}`);

            expect(body.data).toMatch(toJSON(membership));
        });

        it('returns an error if the email is not provided', async () => {
            const { body } = await api.get(`/memberships/${createId()}`);

            expect(body.ok).toBe(false);
            expect(body.error).toExist();
        });
    });
});