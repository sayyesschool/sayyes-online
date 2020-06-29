import React, { useCallback } from 'react';
import {
    Dropdown
} from '@fluentui/react';

export default function Select({ name, options, onChange, ...props }) {
    const handleChange = useCallback((event, option) => {
        event.target.name = name;

        onChange(event, option.key);
    }, []);

    return (
        <Dropdown
            options={options}
            onChange={handleChange}
            {...props}
        />
    );
}