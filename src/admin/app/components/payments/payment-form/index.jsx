import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import moment from 'moment';

import { useFormData } from 'shared/hooks/form';
import { Form } from 'shared/ui-components';
import { paymentMethodOptions, operatorOptions } from 'shared/data/payment';

export default forwardRef(PaymentForm);

const defaultPayment = {
    amount: 0,
    description: '',
    paidAt: new Date(),
    paymentMethod: '',
    operator: ''
};

function PaymentForm({ payment = {}, onSubmit, ...props }, ref) {
    const formRef = useRef();

    useImperativeHandle(ref, () => ({
        get form() { return formRef.current; },
        get data() { return data; }
    }));

    const { data, handleChange } = useFormData({
        ...defaultPayment,
        ...payment
    }, [payment]);

    const handleSubmit = useCallback(() => {
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form ref={formRef} className="sy-PaymentForm" onSubmit={handleSubmit} {...props}>
            <Form.Input
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                fluid
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
                value={moment(data.paidAt).format('YYYY-MM-DD')}
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
                    options={operatorOptions}
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