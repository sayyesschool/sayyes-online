import React from 'react';
import { Dialog } from 'mdc-react';

import './index.scss';

export default function PaymentDialog({ title = 'Оплата обучения', ...props }) {
    return (
        <Dialog
            className="payment-dialog"
            title={title}
            {...props}
        />
    );
}