import { Link } from 'react-router-dom';

import ActionButton from 'shared/components/action-button';
import ConfirmButton from 'shared/components/confirm-button';
import PersonChip from 'shared/components/person-chip';
import StatusChip from 'shared/components/status-chip';
import { PaymentOperatorLabel, PaymentPurposeLabel } from 'shared/data/payment';
import { Chip, Flex, IconButton, Popover, Surface, Table, Text } from 'shared/ui-components';

const columns = [
    { key: 'number', content: '№', align: 'center' },
    { key: 'purpose', content: 'Цель' },
    { key: 'amount', content: 'Сумма, руб.' },
    { key: 'date', content: 'Дата' },
    { key: 'user', content: 'Клиент' },
    { key: 'status', content: 'Статус' },
    { key: 'method', content: 'Способ оплаты' },
    { key: 'operator', content: 'Оператор' },
    { key: 'actions' }
];

export default function PaymentsTable({ payments, onResolve, onEdit, onDelete }) {
    return (
        <Table className="PaymentsTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(column =>
                        <Table.Cell
                            key={column.key}
                            {...column}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
                {payments.map((payment, index) =>
                    <Table.Row key={payment.id}>
                        <Table.Cell content={index + 1} align="center" />
                        <Table.Cell content={PaymentPurposeLabel[payment.purpose]} />
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

                            {payment.customer &&
                                <Flex
                                    dir="column"
                                    gap="xxs"
                                >
                                    <span style={{ lineHeight: 1 }}>{payment.customer.name}</span>

                                    <Text
                                        type="body-xs"
                                        content={`${payment.customer.phone} · ${payment.customer.email}`}
                                        style={{ lineHeight: 1 }}
                                        noWrap
                                    />
                                </Flex>
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
                                <Chip content={PaymentOperatorLabel[payment.operator]} />
                            }
                        </Table.Cell>

                        <Table.Cell align="end">
                            <IconButton.Group size="sm">
                                {!payment.isResolved &&
                                    <ActionButton
                                        title="Обновить"
                                        icon="refresh"
                                        onAction={() => onResolve(payment)}
                                    />
                                }

                                {payment.data && (
                                    <Popover
                                        trigger={
                                            <IconButton
                                                title="Посмотреть данные"
                                                icon="text_snippet"
                                                size="sm"
                                            />
                                        }
                                    >
                                        <Surface padding="sm">
                                            {Object.entries(payment.data).map(([key, value]) =>
                                                <Text key={key}>{key}: {value}</Text>
                                            )}
                                        </Surface>
                                    </Popover>
                                )}

                                <IconButton
                                    title="Изменить"
                                    icon="edit"
                                    onClick={() => onEdit(payment)}
                                />

                                <ConfirmButton
                                    title="Удалить"
                                    message="Удалить встречу?"
                                    icon="delete"
                                    color="danger"
                                    onConfirm={() => onDelete(payment)}
                                />
                            </IconButton.Group>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}