import { IconButton, List, Text } from 'shared/ui-components';

export default function TransactionsList({ transactions, onClick, onDelete }) {
    return (
        <List className="transactions-list">
            {transactions.map(transaction =>
                <List.Item
                    key={transaction.id}
                    content={<>
                        <Text>{transaction.amount} руб.</Text>
                        <Text type="body2">{transaction.description}</Text>
                    </>}
                    end={
                        <IconButton
                            icon="delete"
                            title="Удалить транзакцию"
                            color="neutral"
                            size="sm"
                            variant="plain"
                            onClick={event => onDelete(event, transaction)}
                        />
                    }
                    onClick={() => onClick(transaction)}
                />
            )}
        </List>
    );
}