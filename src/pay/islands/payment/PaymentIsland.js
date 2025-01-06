import Island from '../Island';

import Payment from './Payment';

export default class PaymentIsland extends Island {
    constructor(selector) {
        super(selector, Payment);
    }
}