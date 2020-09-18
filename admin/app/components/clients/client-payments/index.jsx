import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton,
    List,
    Typography
} from 'mdc-react';

export default function ClientPayments({ payments, onCreate }) {
    return (
        <section className="client-payments">
            <Card>
                <Card.Header
                    title="Платежи"
                    actions={
                        <IconButton title="Создать платеж" onClick={onCreate}>
                            <Icon>add</Icon>
                        </IconButton>
                    }
                />

                {payments && payments.length > 0 ?
                    <List twoLine>
                        {payments.map(payment =>
                            <List.Item
                                key={payment.id}
                                component={Link}
                                to={payment.url}
                                graphic={<Icon>{payment.statusIcon}</Icon>}
                                primaryText={`${payment.amount} руб.`}
                                secondaryText={`${payment.statusLabel} • ${payment.datetime}`}
                            />
                        )}
                    </List>
                    :
                    <Card.Section primary>
                        <Typography noMargin>Платежей нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}