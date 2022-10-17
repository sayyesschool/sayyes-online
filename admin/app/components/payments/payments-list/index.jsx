import { Button, Icon, List, Status } from 'shared/ui-components';

import './index.scss';

export default function PaymentsList({ payments, onClick, onDelete }) {
    return (
        <List className="payments-list">
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    //media={<Icon>{payment.statusIcon}</Icon>}
                    media={
                        <Status state="success" />
                    }
                    header={`${payment.amount} руб.`}
                    content={payment.description}
                    endMedia={
                        <Button
                            icon={<Icon>delete</Icon>}
                            title="Удалить платеж"
                            iconOnly
                            text
                            onClick={event => onDelete(event, payment)}
                        />
                    }
                    navigable
                    onClick={() => onClick(payment)}
                />
            )}
        </List>
    );
}