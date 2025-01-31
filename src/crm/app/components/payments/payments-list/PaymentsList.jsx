import StatusIcon from 'shared/components/status-icon';
import { IconButton, List, Text } from 'shared/ui-components';

export default function PaymentsList({ payments, onClick, onDelete }) {
    return (
        <List className="PaymentsList">
            {payments.map(payment =>
                <List.Item
                    key={payment.id}
                    decorator={
                        <StatusIcon status={payment.status} />
                    }
                    content={<>
                        <Text>{`${payment.amount} руб.`}</Text>
                        <Text>{payment.description}</Text>
                    </>}
                    endAction={
                        <IconButton
                            icon="delete"
                            title="Удалить платеж"
                            onClick={() => onDelete(payment)}
                        />
                    }
                    onClick={() => onClick(payment)}
                />
            )}
        </List>
    );
}