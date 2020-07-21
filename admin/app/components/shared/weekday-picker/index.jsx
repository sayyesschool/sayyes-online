import React, { useCallback } from 'react';
import {
    Checkbox,
    FormField,
    Layout
} from 'mdc-react';

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekdaySelect({ name, selectedValues, onChange }) {
    const handleChange = useCallback((event, checked) => {
        const value = Number(event.target.value);
        const set = new Set(selectedValues);

        checked ? set.add(value) : set.delete(value);

        const newValues = Array.from(set).sort();

        onChange(event, newValues);
    }, [selectedValues]);

    return (
        <Layout row>
            {labels.map((label, index) =>
                <FormField key={label} label={label}>
                    <Checkbox
                        name={name}
                        value={index}
                        checked={selectedValues.includes(index)}
                        onChange={handleChange}
                    />
                </FormField>
            )}
        </Layout>
    );
}