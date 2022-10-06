import { Link } from 'react-router-dom';
import { Button, Pill, Table } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';
import StatusLabel from 'shared/components/status-label';

export default function PaymentsTable({ payments, onEdit, onDelete }) {
    return (
        <Table className="payments-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.text}
                    />
                )}

                <Table.Cell />
            </Table.Row>

            {payments.map(payment =>
                <Table.Row key={payment.id}>
                    <Table.Cell content={payment.amount} />

                    <Table.Cell content={payment.description} />

                    <Table.Cell content={payment.date} />

                    <Table.Cell
                        content={payment.client &&
                            <Pill
                                as={Link}
                                to={`/clients/${payment.client.id}`}
                                image={payment.client.imageUrl}
                                content={payment.client.fullname}
                                appearance="inverted"
                            />
                        }
                    />

                    <Table.Cell
                        content={
                            <StatusLabel
                                status={payment.status}
                                content={payment.statusLabel}
                            />
                        }
                    />

                    <Table.Cell content={payment.paymentMethod} />

                    <Table.Cell
                        content={
                            <Button.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: <Icon>edit</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onEdit(payment)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: <Icon>delete</Icon>,
                                        iconOnly: true,
                                        text: true,
                                        onClick: () => onDelete(payment)
                                    }
                                ]}
                            />
                        }
                    />
                </Table.Row>
            )}
        </Table>
    );
}

const columns = [
    {
        key: 'amount',
        text: 'Сумма, руб.'
    },
    {
        key: 'description',
        text: 'Описание'
    },
    {
        key: 'date',
        text: 'Дата'
    },
    {
        key: 'user',
        text: 'Клиент'
    },
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'method',
        text: 'Способ оплаты'
    }
];