import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import moment from 'moment';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';
import FormTextArea from 'shared/components/form-textarea';

import { paymentMethodOptions, operatorOptions } from 'shared/data/payment';

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
        data.date = moment(data.date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
        data.status = 'succeeded';

        onSubmit(data);
    }, [data]);

    return (
        <Form ref={formRef} className="payment-form" onSubmit={handleSubmit} {...props}>
            <FormInput
                type="text"
                name="description"
                value={data.description}
                label="Описание"
                fluid
                required
                onChange={onChange}
            />

            <FormInput
                type="number"
                name="amount"
                value={data.amount}
                label="Сумма"
                suffix="руб."
                min={1}
                required
                onChange={onChange}
            />

            <FormInput
                type="date"
                name="paidAt"
                value={moment(data.paidAt).format('YYYY-MM-DD')}
                label="Дата"
                onChange={onChange}
            />

            <FormSelect
                name="paymentMethod"
                value={data.paymentMethod}
                label="Способ оплаты"
                options={paymentMethodOptions}
                onChange={onChange}
            />

            {(data.paymentMethod !== '' && data.paymentMethod !== 'cash') &&
                <FormSelect
                    name="operator"
                    value={data.operator}
                    label="Оператор"
                    options={operatorOptions}
                    onChange={onChange}
                />
            }

            <FormTextArea
                type="text"
                name="note"
                value={data.note}
                label="Заметка"
                onChange={onChange}
            />
        </Form>
    );
}