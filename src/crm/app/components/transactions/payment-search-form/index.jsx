import { useCallback } from 'react';

import { operatorOptions, paymentMethodOptions } from 'shared/data/payment';
import useForm from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import Form from 'shared/ui-components/form';

import './index.scss';

export default function PaymentForm({ payment = {}, onSubmit }) {
    const { data, setData } = useForm({
        amount: 0,
        description: '',
        date: datetime(payment.date).format('YYYY-MM-DD'),
        paymentMethod: payment.method?.type,
        learner: payment.learner ? payment.learner.id : '',
        ...payment
    });

    const handleSubmit = useCallback(() => {
        data.date = datetime(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form id="payment-form" onSubmit={handleSubmit}>
            <Form.Input
                type="number"
                name="amount"
                value={data.amount}
                label="Сумма"
                min={1}
                onChange={setData}
            />

            <Form.Input
                type="date"
                name="date"
                value={data.date}
                label="Дата"
                onChange={setData}
            />

            <Form.Input
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                onChange={setData}
            />

            <Form.Select
                name="paymentMethod"
                value={data.paymentMethod}
                label="Способ оплаты"
                options={paymentMethodOptions}
                //onChange={onChange}
            />

            <Form.Select
                name="operator"
                value={data.operator}
                label="Оператор"
                options={operatorOptions}
                //onChange={onChange}
            />
        </Form>
    );
}