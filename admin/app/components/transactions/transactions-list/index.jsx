import {
    Button,
    List,
    Status,
    Text
} from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

import './index.scss';

const typeToColor = {
    debit: 'green',
    credit: 'red'
};

const typeToState = {
    debit: 'success',
    credit: 'error'
};

const typeToSign = {
    debit: '+',
    credit: '-'
};

export default function TransactionsList({ transactions, onClick, onDelete }) {
    return (
        <List className="transactions-list">
            {transactions.map(transaction =>
                <List.Item
                    key={transaction.id}
                    header={<Text color={typeToColor[transaction.type]}>{typeToSign[transaction.type]} {transaction.amount} руб.</Text>}
                    content={transaction.description}
                    headerMedia={transaction.enrollment?.domainLabel}
                    endMedia={
                        <Button
                            icon={<Icon>delete</Icon>}
                            title="Удалить транзакцию"
                            iconOnly
                            text
                            onClick={event => onDelete(event, transaction)}
                        />
                    }
                    navigable
                    onClick={() => onClick(transaction)}
                />
            )}
        </List>
    );
}