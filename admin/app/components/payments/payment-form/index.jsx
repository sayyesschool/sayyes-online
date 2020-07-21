import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import PeopleSelect from 'app/components/shared/people-select';

import './index.scss';

const defaultData = () => ({
    user: {},
    amount: 0,
    date: new Date(),
    method: '',
    description: ''
});

export default function PaymentForm({ payment = defaultData(), onSubmit }) {
    const [data, setData] = useForm({
        user: payment.user?.fullname,
        amount: payment.amount,
        date: moment(payment.date).format('YYYY-MM-DDTHH:mm'),
        method: payment.method?.title,
        description: payment.description
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

        onSubmit(data);
    }, [data]);

    return (
        <Form id="payment-form" onSubmit={handleSubmit}>
            <Layout tokens={{ childrenGap: 8 }}>
                <TextField
                    type="number"
                    label="Сумма"
                    name="amount"
                    value={data.amount}
                    onChange={setData}
                />

                <TextField
                    type="date"
                    label="Дата"
                    name="dob"
                    value={data.dob}
                    onChange={setData}
                />

                <PeopleSelect
                    label="Студент"
                    name="student"
                    value={data.student?.id}
                    resolveUrl="/admin/api/students"
                />

                <TextField
                    type="text"
                    name="note"
                    value={data.note}
                    label="Заметка"
                    multiline
                    onChange={setData}
                />
            </Layout>
        </Form>
    );
}