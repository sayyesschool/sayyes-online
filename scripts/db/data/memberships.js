import moment from 'moment';

import { learner } from './users';

export default [
    {
        limit: 1,
        price: 590,
        startDate: moment().toDate(),
        endDate: moment().add(2, 'weeks').toDate(),
        userId: learner._id,
        payment_id: null,
        registrationIds: []
    },
    {
        limit: 4,
        price: 2990,
        startDate: moment().toDate(),
        endDate: moment().add(1, 'month').toDate(),
        userId: learner._id,
        paymentId: null,
        registrationIds: []
    }
];