import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import { useActions } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import PaymentForm from 'app/components/payments/payment-form';

export default function EnrollmentPayments({ enrollment }) {
    const paymentActions = useActions('payments');

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleCreatePayment = useCallback(data => {
        data.enrollment = enrollment.id;
        data.client = enrollment.client.id;

        paymentActions.createPayment(data)
            .then(() => setPaymentFormOpen(false));
    }, [enrollment]);

    return (
        <section className="enrollment-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    subtitle={enrollment.payments.length === 0 && 'Платежей нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                {enrollment.payments.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.payments.map(payment =>
                                <List.Item
                                    graphic={<Icon>{payment.statusIcon}</Icon>}
                                    primaryText={payment.description}
                                    secondaryText={`${payment.amount} руб.`}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormPanel
                form="payment-form"
                title="Новый платеж"
                open={isFormOpen}
                modal
                onClose={toggleFormOpen}
            >
                <PaymentForm
                    payment={{
                        client: enrollment?.client
                    }}
                    onSubmit={handleCreatePayment}
                />
            </FormPanel>
        </section>
    );
}