import React from 'react';
import { Link } from 'react-router-dom';
import {
    Chip,
    Icon,
    DataTable
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

export default function PaymentList({ payments, onEdit, onDelete }) {
    return (
        <DataTable id="client-list">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell
                            key={col.key}
                        >
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {payments.map(payment =>
                    <DataTable.Row key={payment.id}>
                        <DataTable.Cell>
                            <Chip
                                leadingIcon={<Icon>{payment.statusIcon}</Icon>}
                                text={payment.statusLabel}
                            />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {payment.client &&
                                <Chip
                                    component={Link}
                                    to={`/clients/${payment.client.id}`}
                                    text={payment.client.fullname}
                                />
                            }
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {payment.amount} руб.
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {payment.date}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {payment.paymentMethod}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(payment)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(payment)
                                    }
                                ]}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}

const columns = [
    {
        key: 'status',
        text: 'Статус'
    },
    {
        key: 'user',
        text: 'Клиент'
    },
    {
        key: 'amount',
        text: 'Сумма'
    },
    {
        key: 'date',
        text: 'Дата'
    },
    {
        key: 'method',
        text: 'Способ оплаты'
    },
    {
        key: 'note',
        text: 'Заметка'
    }
];