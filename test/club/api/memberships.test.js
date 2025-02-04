import expect from 'expect';

import { createId, toJSON } from 'test/helpers';
import { MEMBERSHIP, USER_ID } from 'test/_data';
import { context } from 'test/_env';

import api from './api';

const {
    models: { Membership, User }
} = context;

describe('Club Memberships API', () => {
    after(async () => {
        await Membership.deleteMany();
        await User.deleteMany();
    });

    describe('GET /', () => {
        it('returns latest membership', async () => {
            const membership = await Membership.create({
                ...MEMBERSHIP,
                userId: USER_ID
            });

            const { body } = await api.get('/memberships/my');

            expect(body.data).toMatch(toJSON(membership));
        });

        it('returns a membership by id', async () => {
            const membership = await Membership.create(MEMBERSHIP);

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