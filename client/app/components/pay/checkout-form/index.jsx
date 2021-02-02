import React, { useState, useCallback } from 'react';
import {
    Checkbox,
    FormField,
    Typography
} from 'mdc-react';

import Form from 'shared/components/Form';

export default function CheckoutForm({ plan, pack, paymentMethod }) {
    const [savePaymentMethod, setSavePaymentMethod] = useState(false);
    const [usePaymentMethod, setUsePaymentMethod] = useState(Boolean(paymentMethod));

    const toggleSavePaymentMethodChange = useCallback(() => {
        setSavePaymentMethod(value => !value);
    }, []);

    const toggleUsePaymentMethodChange = useCallback(() => {
        setUsePaymentMethod(value => !value);
    }, []);

    const handleSubmit = useCallback(event => {
        if (usePaymentMethod) {
            event.preventDefault();

            setSavePaymentMethod(false);
            setUsePaymentMethod(true);

            onSubmit({ plan: plan.id, savePaymentMethod, usePaymentMethod })
                .finally(onClose);

            return false;
        } else {
            return true;
        }
    }, [plan, savePaymentMethod, usePaymentMethod]);

    return (
        <Form
            id="checkout-form"
            method="post"
            action="/api/checkout"
            preventDefault={false}
            onSubmit={handleSubmit}
        >
            <Typography>
                Вы оплачиваете "{plan?.title}" <b>{pack?.description}</b> за <b>{pack?.price} руб</b>.
                </Typography>

            {paymentMethod ?
                <FormField label={`Оплатить с привязанной карты ${paymentMethod.title}`}>
                    <Checkbox
                        name="usePaymentMethod"
                        checked={usePaymentMethod}
                        onChange={toggleUsePaymentMethodChange}
                    />
                </FormField>
                :
                <React.Fragment>
                    <FormField label="Сохранить карту для будущих платежей (при оплате банковской картой)">
                        <Checkbox
                            name="savePaymentMethod"
                            checked={savePaymentMethod}
                            onChange={toggleSavePaymentMethodChange}
                        />
                    </FormField>

                    <Typography type="caption" element="p">
                        На нашем сайте не хранятся полные данные вашей карты. Мы храним только тип карты (Visa/MasterCard) и последние четыре цифры. Полная информация сохраняется в платежной системе.
                            </Typography>
                </React.Fragment>
            }

            <Typography>Нажимая кнопку «Оплатить», вы подтверждаете своё согласие с <a href="/offer" target="_blank">условиями предоставления услуг</a>.</Typography>
        </Form>
    );
}