import { useCallback } from 'react';

import { operatorOptions, paymentMethodOptions } from 'shared/data/payment';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Flex, Form } from 'shared/ui-components';

export default function PaymentSearchForm({
    payment = {},
    onSubmit,
    ...props
}) {
    const { data, handleChange } = useFormData({
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
    }, [data, onSubmit]);

    return (
        <Form
            className="PaymentSearchForm"
            onSubmit={handleSubmit}
            {...props}
        >
            <Flex gap="smaller">
                <Form.Input
                    label="Сумма"
                    type="number"
                    name="amount"
                    value={data.amount}
                    min={1}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Input
                    label="Дата"
                    type="date"
                    name="date"
                    value={data.date}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Способ оплаты"
                    name="paymentMethod"
                    value={data.paymentMethod}
                    options={paymentMethodOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />

                <Form.Select
                    label="Оператор"
                    name="operator"
                    value={data.operator}
                    options={operatorOptions}
                    orientation="horizontal"
                    onChange={handleChange}
                />
            </Flex>
        </Form>
    );
}