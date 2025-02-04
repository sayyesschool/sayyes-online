import expect from 'expect';

import datetime from 'shared/libs/datetime';

import { createId, toJSON } from 'test/helpers';
import { USER } from 'test/_data';
import { models } from 'test/_env';

const { Membership, User } = models;

describe('Membership model', () => {
    let user;

    before(async () => {
        user = await User.create(USER);
    });

    afterEach(async () => {
        await Membership.deleteMany({});
    });

    describe('query helpers', () => {
        describe('expired', () => {
            it('returns expired memberships', async () => {
                const membership = await Membership.create({
                    startDate: datetime().subtract(2, 'months').toDate(),
                    endDate: datetime().subtract(1, 'month').toDate(),
                    userId: user.id
                });

                const expired = await Membership.find().expired();

                expect(toJSON(expired)).toInclude(toJSON(membership));
            });
        });

        describe('unexpired', () => {
            it('returns unexpired memberships', async () => {
                const membership = await Membership.create({
                    startDate: datetime().subtract(1, 'month').toDate(),
                    endDate: datetime().add(1, 'month').toDate(),
                    userId: user.id
                });

                const unexpired = await Membership.find().unexpired();

                expect(toJSON(unexpired)).toInclude(toJSON(membership));
            });
        });
    });

    describe('static methods', () => {
        describe('getEndDate', () => {
            it('returns the end date of a membership', () => {
                const startDate = datetime().toDate();
                const pack = { duration: [1, 'month'] };

                expect(Membership.getEndDate(startDate, pack)).toEqual(
                    datetime(startDate).add(1, 'month').toDate()
                );
            });
        });

        describe('getAlmostFullMemberships', () => {
            it.only('returns memberships that are almost full', async () => {
                const membership = await Membership.create([
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'month').toDate(),
                        endDate: datetime().subtract(1, 'day').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId()]
                    }
                ]);

                const almostFullMemberships = await Membership.getAlmostFullMemberships();
                const ids = almostFullMemberships.map(m => m.id);

                expect(ids.length).toBe(1);
                expect(ids).toInclude(membership[0].id);
                expect(almostFullMemberships.every(m => m.user)).toBe(true);
            });
        });

        describe('getFullMemberships', () => {
            it.only('returns memberships that are full', async () => {
                const membership = await Membership.create([
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId(), createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'month').toDate(),
                        endDate: datetime().subtract(1, 'day').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId(), createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId(), createId()]
                    },
                    {
                        limit: 5,
                        startDate: datetime().subtract(1, 'day').toDate(),
                        endDate: datetime().add(1, 'month').toDate(),
                        userId: user.id,
                        registrationIds: [createId(), createId(), createId()]
                    }
                ]);

                const fullMemberships = await Membership.getFullMemberships();
                const ids = fullMemberships.map(m => m.id);

                expect(ids.length).toBe(1);
                expect(ids).toInclude(membership[0].id);
                expect(fullMemberships.every(m => m.user)).toBe(true);
            });
        });

        describe('getSoldByMonth', () => {
            it('returns the number of memberships sold by month', async () => {
                const membership = await Membership.create({
                    price: 100,
                    startDate: datetime().subtract(1, 'day').toDate(),
                    endDate: datetime().add(1, 'month').toDate(),
                    userId: user.id
                });

                const soldByMonth = await Membership.getSoldByMonth();

                expect(soldByMonth).toEqual([
                    {
                        _id: datetime().month() + 1,
                        count: 1,
                        amount: membership.price
                    }
                ]);
            });
        });
    });
});