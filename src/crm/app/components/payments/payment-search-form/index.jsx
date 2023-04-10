import { useCallback } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import { Flex, Form } from 'shared/ui-components';
import { paymentMethodOptions, operatorOptions } from 'shared/data/payment';

export default function PaymentSearchForm({
    payment = {},
    onSubmit,
    ...props
}) {
    const { data, handleChange } = useFormData({
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
        <Form className="PaymentSearchForm" onSubmit={handleSubmit} {...props}>
            <Flex gap="smaller">
                <Form.Input
                    type="number"
                    name="amount"
                    value={data.amount}
                    label="Сумма"
                    min={1}
                    onChange={handleChange}
                />

                <Form.Input
                    type="date"
                    name="date"
                    value={data.date}
                    label="Дата"
                    onChange={handleChange}
                />

                <Form.Select
                    name="paymentMethod"
                    value={data.paymentMethod}
                    label="Способ оплаты"
                    options={paymentMethodOptions}
                    onChange={handleChange}
                />

                <Form.Select
                    name="operator"
                    value={data.operator}
                    label="Оператор"
                    options={operatorOptions}
                    onChange={handleChange}
                />
            </Flex>
        </Form>
    );
}