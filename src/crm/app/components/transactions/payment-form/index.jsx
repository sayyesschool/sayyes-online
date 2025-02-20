import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { operatorOptions, paymentMethodOptions } from 'shared/data/payment';
import useForm from 'shared/hooks/form';
import datetime from 'shared/libs/datetime';
import Form from 'shared/ui-components/form';

import './index.scss';

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

    const { data, onChange } = useForm({
        ...defaultPayment,
        ...payment
    }, [payment]);

    const handleSubmit = useCallback(() => {
        data.date = datetime(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form
            ref={formRef} className="payment-form"
            onSubmit={handleSubmit} {...props}
        >
            <Form.Input
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                fluid
                required
                onChange={onChange}
            />

            <Form.Input
                type="number"
                name="amount"
                value={data.amount}
                label="Сумма"
                suffix="руб."
                min={1}
                required
                onChange={onChange}
            />

            <Form.Input
                type="date"
                name="paidAt"
                value={datetime(data.paidAt).format('YYYY-MM-DD')}
                label="Дата"
                onChange={onChange}
            />

            <Form.Select
                name="paymentMethod"
                value={data.paymentMethod}
                label="Способ оплаты"
                options={paymentMethodOptions}
                onChange={onChange}
            />

            {(data.paymentMethod !== '' && data.paymentMethod !== 'cash') &&
                <Form.Select
                    name="operator"
                    value={data.operator}
                    label="Оператор"
                    options={operatorOptions}
                    onChange={onChange}
                />
            }

            <Form.Textarea
                type="text"
                name="note"
                value={data.note}
                label="Заметка"
                onChange={onChange}
            />
        </Form>
    );
}