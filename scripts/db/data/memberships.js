import { Types } from 'mongoose';

import datetime from 'shared/libs/datetime';

import { learner } from './users';

export const membership1 = {
    _id: new Types.ObjectId().toHexString(),
    limit: 1,
    price: 590,
    startDate: datetime().toDate(),
    endDate: datetime().add(2, 'weeks').toDate(),
    userId: learner._id,
    payment_id: null,
    registrationIds: []
};

export const membership4 = {
    _id: new Types.ObjectId().toHexString(),
    limit: 4,
    price: 2990,
    startDate: datetime().toDate(),
    endDate: datetime().add(1, 'month').toDate(),
    userId: learner._id,
    paymentId: null,
    registrationIds: []
};

export default [
    membership1,
    membership4
];