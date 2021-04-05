import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    Icon,
    List
} from 'mdc-react';

import './index.scss';

export default function PaymentsList({ payments, onClick, onDelete }) {
    return (
        <List className="payments-list" twoLine>
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    graphic={<Icon>{payment.statusIcon}</Icon>}
                    primaryText={payment.description}
                    secondaryText={`${payment.amount} руб.`}
                    meta={
                        <IconButton
                            icon="remove"
                            title="Удалить платеж"
                            onClick={event => onDelete(event, payment)}
                        />
                    }
                    onClick={() => onClick(payment)}
                />
            )}
        </List>
    );
}