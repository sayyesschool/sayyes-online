import React from 'react';
import {
    Select
} from 'mdc-react';

import paymentMethods from 'shared/../data/payment-methods';

export default function PaymentMethodSelect(props) {
    return (
        <Select
            className="payment-method-select"
            name="paymentMethod"
            label="Способ оплаты"
            filled
            options={paymentMethods.map(method => ({
                key: method.id,
                value: method.id,
                text: method.name
            }))}
            {...props}
        />
    );
}