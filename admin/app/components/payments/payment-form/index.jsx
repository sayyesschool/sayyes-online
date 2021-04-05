import React, { forwardRef, useCallback, useRef, useImperativeHandle } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import PaymentMethodSelect from 'app/components/payments/payment-method-select';

import './index.scss';

const defaultPayment = {
    amount: 0,
    description: '',
    paidAt: new Date(),
    paymentMethod: ''
};

export default forwardRef(PaymentForm);

function PaymentForm({ payment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const [data, setData] = useForm({
        ...defaultPayment,
        ...payment
    }, [payment]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form ref={formRef} className="payment-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <TextField
                    type="text"
                    name="description"
                    value={data.description}
                    label="Описание"
                    filled
                    required
                    onChange={setData}
                />

                <TextField
                    type="number"
                    name="amount"
                    value={data.amount}
                    label="Сумма"
                    filled
                    min={1}
                    required
                    onChange={setData}
                />

                <TextField
                    type="date"
                    name="date"
                    value={moment(data.paidAt).format('YYYY-MM-DD')}
                    label="Дата"
                    filled
                    onChange={setData}
                />

                <PaymentMethodSelect
                    value={data.paymentMethod}
                    onChange={setData}
                />

                <TextField
                    type="text"
                    name="note"
                    value={data.note}
                    label="Заметка"
                    filled
                    textarea
                    onChange={setData}
                />
            </Layout>
        </Form>
    );
}