import { useCallback, useEffect, useRef } from 'react';
import { Dropdown } from '@fluentui/react-northstar';

import Icon from 'shared/ui-components/icon';

export default function Select({ name, value, options, label, required, search, onChange, ...props }) {
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
        <Dropdown
            name={name}
            value={optionsRef.current.get(value)?.content}
            items={options}
            toggleIndicator={<Icon>expand_more</Icon>}
            clearIndicator={<Icon>clear</Icon>}
            search={search}
            fluid
            onChange={handleChange}
            {...props}
        />
    );
}

function mapOptions(options) {
    return new Map(options.map(option => [option.value || option, option]));
}