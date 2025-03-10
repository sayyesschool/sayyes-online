import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { paymentMethodOptions, paymentOperatorOptions } from 'shared/data/payment';
import { useFormData } from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import { Form } from 'shared/ui-components';

export default forwardRef(PaymentForm);

const getData = (payment = {
    amount: 0,
    description: '',
    paidAt: new Date(),
    paymentMethod: '',
    operator: ''
}) => ({
    amount: payment.amount,
    description: payment.description,
    paidAt: datetime(payment.paidAt).format('YYYY-MM-DD'),
    paymentMethod: payment.paymentMethod,
    operator: payment.operator
});

function PaymentForm({ payment, onSubmit, ...props }, ref) {
    const formRef = useRef();

    const { data, handleChange } = useFormData(getData(payment), [payment?.id]);

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const handleSubmit = useCallback(() => {
        data.date = datetime(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data, onSubmit]);

    return (
        <Form
            ref={formRef}
            onSubmit={handleSubmit}
            {...props}
        >
            <Form.Input
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                required
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="amount"
                value={data.amount}
                label="Сумма"
                suffix="руб."
                min={1}
                required
                onChange={handleChange}
            />

            <Form.Input
                type="date"
                name="paidAt"
                value={datetime(data.paidAt).format('YYYY-MM-DD')}
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

            {(data.paymentMethod !== '' && data.paymentMethod !== 'cash') &&
                <Form.Select
                    name="operator"
                    value={data.operator}
                    label="Оператор"
                    options={paymentOperatorOptions}
                    onChange={handleChange}
                />
            }

            <Form.Textarea
                type="text"
                name="note"
                value={data.note}
                label="Заметка"
                onChange={handleChange}
            />
        </Form>
    );
}