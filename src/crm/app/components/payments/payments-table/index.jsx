import { Link } from 'react-router-dom';

import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { Chip, IconButton, Table } from 'shared/ui-components';

const columns = [
    { key: 'number', text: '№' },
    { key: 'description', text: 'Описание' },
    { key: 'amount', text: 'Сумма, руб.' },
    { key: 'date', text: 'Дата' },
    { key: 'user', text: 'Клиент' },
    { key: 'status', text: 'Статус' },
    { key: 'method', text: 'Способ оплаты' },
    { key: 'operator', text: 'Оператор' },
    { key: 'actions' }
];

export default function PaymentsTable({ payments, onResolve, onEdit, onDelete }) {
    return (
        <Table className="PaymentsTable">
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
                {payments.map((payment, index) =>
                    <Table.Row key={payment.id}>
                        <Table.Cell content={index + 1} />
                        <Table.Cell content={payment.description} />
                        <Table.Cell content={payment.amount} />
                        <Table.Cell content={payment.dateLabel} />

                        <Table.Cell>
                            {payment.user &&
                                <PersonChip
                                    as={Link}
                                    to={payment.user.url}
                                    imageSrc={payment.user.imageUrl}
                                    content={payment.user.fullname}
                                />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            <StatusChip
                                status={payment.status}
                                content={payment.statusLabel}
                            />
                        </Table.Cell>

                        <Table.Cell>
                            {payment.method &&
                                <Chip content={payment.method.card ? payment.method.card.title : payment.method.type} />
                            }
                        </Table.Cell>

                        <Table.Cell>
                            {payment.operator &&
                                <Chip content={payment.operator} />
                            }
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'update',
                                        title: 'Обновить',
                                        icon: 'refresh',
                                        disabled: payment.isResolved,
                                        onClick: () => onResolve(payment)
                                    },
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