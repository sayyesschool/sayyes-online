import React, { useState, useCallback } from 'react';
import {
    Checkbox,
    FormField,
    TextField
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import './index.scss';

export default function BalanceForm({ onSubmit, onClose, ...props }) {
    const [value, setValue] = useState(0);

    const [isConfirmed, toggleConfirmed] = useBoolean(true);

    const handleChange = useCallback((event, value) => {
        setValue(value);
    }, []);

    const handleSubmit = useCallback(event => {
        if (!value) {
            event.preventDefault();
            return;
        }

        if (typeof ym === 'function') {
            ym(YANDEX_METRIKA_ID, 'reachGoal', 'purchase');
        }

        if (typeof gtag === 'function') {
            gtag('event', 'click', { event_category: 'purchase' });
        }

        return true;
    }, [value]);

    return (
        <form id="balance-form" method="post" action="/api/account/balance" onSubmit={handleSubmit} {...props}>
            <TextField
                type="number"
                name="amount"
                value={value}
                label="Сумма"
                suffix="руб."
                min="0"
                filled
                onChange={handleChange}
            />

            <FormField label="Я согласен/на с условиями предоставления услуг и политикой конфиденциальности.">
                <Checkbox
                    name="confirm"
                    checked={isConfirmed}
                    required
                    onChange={toggleConfirmed}
                />
            </FormField>
        </form>
    );
}