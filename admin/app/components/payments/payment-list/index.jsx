import React from 'react';
import { Link } from 'react-router-dom';
import {
    DetailsList,
    Icon
} from '@fluentui/react';

export default function PaymentsList({ payments }) {
    const items = payments.map(payment => ({
        key: payment.id,
        value: payment.id,
        status: payment.status,
        user: payment.user.fullname,
        amount: payment.amount,
        date: payment.date,
        method: payment.method.title,
        note: payment.note
    }));

    return (
        <section id="payment-list">
            <DetailsList
                items={items}
                compact={false}
                columns={columns}
                setKey="none"
                isHeaderVisible={true}
            />
        </section>
    );
}

const columns = [
    {
        key: 'status',
        name: 'status',
        fieldName: 'status',
        iconName: 'StatusCircleRing',
        minWidth: 16,
        maxWidth: 16,
        isIconOnly: true,
        onRender: item => <Icon iconName="Star" />
    },
    {
        key: 'user',
        name: 'Плательщик',
        fieldName: 'user',
        data: 'string',
        minWidth: 100,
        maxWidth: 256,
        isRowHeader: true,
        isPadded: true,
        onRender: item => <Link to={`/${item.id}`}>{item.user}</Link>
    },
    {
        key: 'amount',
        name: 'Сумма',
        fieldName: 'amount',
        data: 'number',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'date',
        name: 'Дата',
        fieldName: 'date',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'method',
        name: 'Способ оплаты',
        fieldName: 'method',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    },
    {
        key: 'note',
        name: 'Заметка',
        fieldName: 'note',
        data: 'string',
        minWidth: 100,
        isRowHeader: true,
        isPadded: true
    }
];