import React from 'react';
import {
    Card,
    IconButton,
    Typography
} from 'mdc-react';

import PaymentsList from 'app/components/payments/payments-list';

export default function ClientPayments({ payments, onCreate }) {
    return (
        <section className="client-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    actions={
                        <IconButton
                            icon="add"
                            title="Создать платеж"
                            onClick={onCreate}
                        />
                    }
                />

                {payments && payments.length > 0 ?
                    <PaymentsList
                        payments={payments}
                    />
                    :
                    <Card.Section primary>
                        <Typography noMargin>Платежей нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}