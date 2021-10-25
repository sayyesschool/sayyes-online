import {
    IconButton,
    List
} from 'mdc-react';

import './index.scss';

export default function PaymentsList({ payments, onClick, onDelete }) {
    return (
        <List className="payments-list">
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    leadingIcon={payment.statusIcon}
                    primaryText={payment.description}
                    secondaryText={`${payment.amount} руб.`}
                    trailingIcon={
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