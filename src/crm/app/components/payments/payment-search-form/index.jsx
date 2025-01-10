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
    }, [data]);

    return (
        <Form
            className="PaymentSearchForm" onSubmit={handleSubmit}
            {...props}
        >
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