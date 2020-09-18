import React, { useCallback } from 'react';
import {
    Checkbox,
    FormField
} from 'mdc-react';

import './index.scss';

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekdaySelect({ id, name, values, onChange }) {
    const handleChange = useCallback(event => {
        onChange(Number(event.target.value));
    }, []);

    return (
        <div className="weekday-select">
            {labels.map((label, index) =>
                <FormField key={label} label={label}>
                    <Checkbox
                        name={name}
                        value={index}
                        checked={values.includes(index)}
                        onChange={handleChange}
                    />
                </FormField>
            )}
        </div>
    );
}