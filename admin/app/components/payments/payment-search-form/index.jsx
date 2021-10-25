import { useCallback } from 'react';
import {
    Layout,
    TextField
} from 'mdc-react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

import PaymentMethodSelect from 'app/components/payments/payment-method-select';

import './index.scss';

export default function PaymentForm({ payment = {}, onSubmit }) {
    const [data, setData] = useForm({
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
            <Layout column>
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
                    value={data.date}
                    label="Дата"
                    filled
                    onChange={setData}
                />

                <TextField
                    type="text"
                    name="description"
                    value={data.description}
                    label="Описание"
                    filled
                    required
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