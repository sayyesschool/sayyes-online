import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
    Stack,
    TextField
} from '@fluentui/react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import DatePicker from 'app/components/shared/date-picker';
import PeoplePicker from 'app/components/shared/people-picker';

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
            <Stack tokens={{ childrenGap: 8 }}>
                <TextField
                    type="number"
                    label="Сумма"
                    name="amount"
                    value={data.amount}
                    onChange={setData}
                />

                <DatePicker
                    label="Дата"
                    name="dob"
                    value={data.dob}
                    onChange={setData}
                />

                <PeoplePicker
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
            </Stack>
        </Form>
    );
}