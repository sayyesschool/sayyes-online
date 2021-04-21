import React, { forwardRef, useCallback, useRef, useImperativeHandle } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import { paymentMethodOptions, operatorOptions } from 'shared/../data/payment';

const defaultPayment = {
    amount: 0,
    description: '',
    paidAt: new Date(),
    paymentMethod: '',
    operator: ''
};

import './index.scss';

export default forwardRef(PaymentForm);

function PaymentForm({ payment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const [data, onChange] = useForm({
        ...defaultPayment,
        ...payment
    }, [payment]);

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
                    onChange={onChange}
                />

                <TextField
                    type="number"
                    name="amount"
                    value={data.amount}
                    label="Сумма"
                    suffix="руб."
                    filled
                    min={1}
                    required
                    onChange={onChange}
                />

                <TextField
                    type="date"
                    name="paidAt"
                    value={moment(data.paidAt).format('YYYY-MM-DD')}
                    label="Дата"
                    filled
                    onChange={onChange}
                />

                <Select
                    name="paymentMethod"
                    value={data.paymentMethod}
                    label="Способ оплаты"
                    filled
                    options={paymentMethodOptions}
                    onChange={onChange}
                />

                {(data.paymentMethod !== '' && data.paymentMethod !== 'cash') &&
                    <Select
                        name="operator"
                        value={data.operator}
                        label="Оператор"
                        filled
                        options={operatorOptions}
                        onChange={onChange}
                    />
                }

                <TextField
                    type="text"
                    name="note"
                    value={data.note}
                    label="Заметка"
                    filled
                    textarea
                    onChange={onChange}
                />
            </Layout>
        </Form>
    );
}