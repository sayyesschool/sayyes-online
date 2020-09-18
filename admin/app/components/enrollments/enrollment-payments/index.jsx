import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

export default function EnrollmentPayments({ enrollment, onCreate }) {
    return (
        <section className="enrollment-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={onCreate}
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
        </section>
    );
}