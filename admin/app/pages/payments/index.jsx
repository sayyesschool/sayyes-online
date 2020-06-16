import React, { useState, useEffect } from 'react';
import {
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { actions as paymentActions } from 'app/store/modules/payments';
import PaymentList from 'app/components/payments/payment-list';

export default function Tickets() {
    const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
    const [payments, actions] = useStore(
        state => state.payments.list,
        paymentActions
    );

    useEffect(() => {
        actions.getTickets();
    }, []);

    return (
        <main id="payments-page" className="page">
            <Typography element="h1" variant="headline4">Платежи</Typography>

            {payments ?
                <PaymentList
                    payments={payments}
                />
                :
                <Spinner />
            }
        </main>
    );
}