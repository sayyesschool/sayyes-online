import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { learner } from './users';

export default [
    {
        uuid: uuid(),
        amount: 590,
        currency: 'RUB',
        status: 'succeeded',
        paid: true,
        refundable: false,
        refunded: false,
        test: true,
        operator: 'yookassa',
        description: 'Payment description',
        paidAt: moment().toDate(),
        userId: learner._id,
        method : {
            id : '26166499-000f-5000-9000-18aebc48e592',
            type : 'bank_card',
            saved : false,
            card : {
                type : 'Visa',
                last4 : '2525',
                month : 12,
                year : 2020,
                country : 'RU',
                issuer : 'Sberbank Of Russia'
            }
        }
    }
];