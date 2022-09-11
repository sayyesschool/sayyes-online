import { useCallback } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';
import { paymentMethodOptions, operatorOptions } from 'shared/data/payment';

import './index.scss';

export default function PaymentForm({ payment = {}, onSubmit }) {
    const { data, setData } = useForm({
        amount: 0,
        description: '',
        date: moment(payment.date).format('YYYY-MM-DD'),
        paymentMethod: payment.method?.type,
        client: payment.client ? payment.client.id : '',
        ...payment
    });

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form id="payment-form" onSubmit={handleSubmit}>
            <FormInput
                type="number"
                name="amount"
                value={data.amount}
                label="Сумма"
                min={1}
                onChange={setData}
            />

            <FormInput
                type="date"
                name="date"
                value={data.date}
                label="Дата"
                onChange={setData}
            />

            <FormInput
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                onChange={setData}
            />

            <FormSelect
                name="paymentMethod"
                value={data.paymentMethod}
                label="Способ оплаты"
                options={paymentMethodOptions}
                onChange={onChange}
            />

            <FormSelect
                name="operator"
                value={data.operator}
                label="Оператор"
                options={operatorOptions}
                onChange={onChange}
            />
        </Form>
    );
}