import React from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    List
} from 'mdc-react';

export default function PaymentsList({ payments }) {
    return (
        <List className="payments-list" twoLine>
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    component={Link}
                    to={payment.url}
                    graphic={<Icon>{payment.statusIcon}</Icon>}
                    primaryText={`${payment.amount} руб.`}
                    secondaryText={payment.statusLabel}
                />
            )}
        </List>
    );
}