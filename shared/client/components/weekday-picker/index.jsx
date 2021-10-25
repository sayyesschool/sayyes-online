import { useCallback, useEffect, useRef } from 'react';
import {
    Checkbox,
    FormField
} from 'mdc-react';

import './index.scss';

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekdaySelect({ name, values, onChange }) {
    const valuesRef = useRef(values);

    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    const handleChange = useCallback(event => {
        const set = new Set(valuesRef.current);
        const day = Number(event.target.value);

        set.has(day) ? set.delete(day) : set.add(day);

        onChange(Array.from(set));
    }, [values, onChange]);

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