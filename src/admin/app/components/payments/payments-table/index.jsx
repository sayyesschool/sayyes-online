import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { IconButton, Table } from 'shared/ui-components';

const columns = [
    { key: 'amount', text: 'Сумма, руб.' },
    { key: 'description', text: 'Описание' },
    { key: 'date', text: 'Дата' },
    { key: 'user', text: 'Клиент' },
    { key: 'status', text: 'Статус' },
    { key: 'method', text: 'Способ оплаты' },
    { key: 'actions' }
];

export default function PaymentsTable({ payments, onEdit, onDelete }) {
    return (
        <Table className="sy-PaymentsTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            content={col.text}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {payments.map(payment =>
                    <Table.Row key={payment.id}>
                        <Table.Cell content={payment.amount} />

                        <Table.Cell content={payment.description} />

                        <Table.Cell content={payment.date} />

                        <Table.Cell>
                            {payment.client &&
                                <PersonChip
                                    as={Link}
                                    to={`/clients/${payment.client.id}`}
                                    imageSrc={payment.client.imageUrl}
                                    content={payment.client.fullname}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            <StatusChip
                                status={payment.status}
                                content={payment.statusLabel}
                            />
                        </Table.Cell>

                        <Table.Cell content={payment.paymentMethod} />

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        title: 'Изменить',
                                        icon: 'edit',
                                        onClick: () => onEdit(payment)
                                    },
                                    {
                                        key: 'delete',
                                        title: 'Удалить',
                                        icon: 'delete',
                                        onClick: () => onDelete(payment)
                                    }
                                ]}
                                color="neutral"
                                size="sm"
                                variant="plain"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}