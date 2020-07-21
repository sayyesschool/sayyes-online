import React from 'react';
import {
    Layout,
    FormField,
    Radio,
    Typography
} from 'mdc-react';

export default function RadioGroup({ name, value, label, options, onChange, ...props }) {
    return (
        <Layout className="radio-group" column>
            <Typography element="h3" variant="subtitle2" noMargin>{label}</Typography>

            {options.map(option =>
                <FormField key={option.value} label={option.label}>
                    <Radio
                        name={name}
                        value={option.value}
                        checked={option.value === value}
                        onChange={onChange}
                    />
                </FormField>
            )}
        </Layout>
    );
}