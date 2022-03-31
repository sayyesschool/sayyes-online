import {
    Button,
    List
} from '@fluentui/react-northstar';

import MaterialIcon from 'shared/components/material-icon';

import './index.scss';

export default function PaymentsList({ payments, onClick, onDelete }) {
    return (
        <List className="payments-list">
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    media={payment.statusIcon}
                    header={payment.description}
                    content={`${payment.amount} руб.`}
                    endMedia={
                        <Button
                            icon={<MaterialIcon icon="remove" />}
                            title="Удалить платеж"
                            iconOnly
                            text
                            onClick={event => onDelete(event, payment)}
                        />
                    }
                    onClick={() => onClick(payment)}
                />
            )}
        </List>
    );
}