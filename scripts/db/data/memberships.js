import datetime from 'shared/libs/datetime';

import { learner } from './users';

export default [
    {
        limit: 1,
        price: 590,
        startDate: datetime().toDate(),
        endDate: datetime().add(2, 'weeks').toDate(),
        userId: learner._id,
        payment_id: null,
        registrationIds: []
    },
    {
        limit: 4,
        price: 2990,
        startDate: datetime().toDate(),
        endDate: datetime().add(1, 'month').toDate(),
        userId: learner._id,
        paymentId: null,
        registrationIds: []
    }
];