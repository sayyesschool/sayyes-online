import { useCallback, useEffect, useRef } from 'react';
import { FormDropdown } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function FormSelect({ name, value, options, label, required, search, onChange, ...props }) {
    const optionsRef = useRef(mapOptions(options));

    useEffect(() => {
        optionsRef.current = mapOptions(options);
    }, [options]);

    const handleChange = useCallback((event, component) => {
        const { name, value } = component;

        onChange(event, {
            name,
            value: typeof value === 'string' ? value : (value?.value || '')
        });
    }, [onChange]);

    return (
        <FormDropdown
            label={!required ? label : {
                content: label,
                required: true
            }}
            name={name}
            value={optionsRef.current.get(value)}
            items={options}
            itemToString={item => item?.header || ''}
            toggleIndicator={<Icon>expand_more</Icon>}
            onChange={handleChange}
            search={search}
            defaultSearchQuery={search && optionsRef.current.get(value)?.header}
            onActiveSelectedIndexChange={console.log}
            {...props}
        />
    );
}

function mapOptions(options) {
    return new Map(options.map(option => [option.value || option, option]));
}