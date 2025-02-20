import expect from 'expect';

import { createId } from 'test/helpers';
import { withMembership, withMembershipPacks, withUser } from 'test/_env';

import api from './api';

describe('Club Memberships API', () => {
    const membership = withMembership();
    withMembershipPacks();
    withUser();

    describe('GET /', () => {
        it('returns user memberships', async () => {
            const { body } = await api.get('/memberships');

            expect(body.data).toBeAn('array');
        });
    });

    describe('GET /:id', () => {
        it('returns membership by id', async () => {
            const { body } = await api.get(`/memberships/${membership.id}`);

            expect(body.data).toExist();
            expect(body.data.id).toEqual(membership.id);
        });

        it('returns error if membership does not exist', async () => {
            const { body } = await api.get(`/memberships/${createId()}`);

            expect(body.ok).toBe(false);
            expect(body.error).toExist();
        });
    });

    describe('GET /my', () => {
        it('returns user membership', async () => {
            const { body } = await api.get('/memberships/my');

            expect(body.data).toExist();
        });
    });

    describe('GET /options', () => {
        it('returns membership options', async () => {
            const { body } = await api.get('/memberships/options');

            expect(body.data).toBeAn('array');
        });
    });
});