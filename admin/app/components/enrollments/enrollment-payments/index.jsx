import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import FormPanel from 'app/components/shared/form-panel';
import PaymentForm from 'app/components/payments/payment-form';

export default function EnrollmentPayments({ enrollment, onCreate }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    return (
        <section className="enrollment-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleFormOpen}
                        />
                    }
                />

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
            </Card>

            <FormPanel
                title="Новый платеж"
                form="payment-form"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <PaymentForm
                    payment={{
                        client: enrollment?.client
                    }}
                    onSubmit={onCreate}
                />
            </FormPanel>
        </section>
    );
}