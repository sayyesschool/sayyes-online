import datetime from 'shared/libs/datetime';

import { createId } from 'test/helpers';

import { USER_ID } from './user';

export const MEMBERSHIP = {
    limit: 4,
    startDate: datetime().toDate(),
    endDate: datetime().add(2, 'week').toDate(),
    registrationIds: [],
    userId: USER_ID
};

export const MEMBERSHIP_ALMOST_FULL = {
    limit: 4,
    startDate: datetime().toDate(),
    endDate: datetime().add(2, 'week').toDate(),
    registrationIds: [createId(), createId()],
    userId: USER_ID
};

export const MEMBERSHIP_FULL = {
    limit: 4,
    startDate: datetime().toDate(),
    endDate: datetime().add(2, 'week').toDate(),
    registrationIds: [createId(), createId(), createId(), createId()],
    userId: USER_ID
};

export const MEMBERSHIP_EXPIRING_IN_3_DAYS = {
    limit: 4,
    startDate: datetime().subtract(2, 'week').toDate(),
    endDate: datetime().add(3, 'days').toDate(),
    registrationIds: [createId()],
    userId: USER_ID
};

export const MEMBERSHIP_EXPIRING_IN_1_DAY = {
    limit: 4,
    startDate: datetime().subtract(2, 'week').toDate(),
    endDate: datetime().add(1, 'day').toDate(),
    registrationIds: [createId()],
    userId: USER_ID
};

export const MEMBERSHIP_EXPIRED = {
    limit: 4,
    startDate: datetime().subtract(2, 'week').toDate(),
    endDate: datetime().subtract(1, 'week').toDate(),
    registrationIds: [createId(), createId()],
    userId: USER_ID
};