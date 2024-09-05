import { useCallback } from 'react';

import { timezones, timezonesMap } from 'shared/data/timezones';
import { FormAutocomplete } from 'shared/ui-components';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    label: item.text
}));

export default function TimeZoneSelect({
    name = 'timezone',
    label = 'Часовой пояс',
    onChange,
    ...props
}) {
    const handleChange = useCallback((event, value, reason) => {
        onChange?.({ target: { name, value } });
    }, [name, onChange]);

    return (
        <FormAutocomplete
            name={name}
            label={label}
            options={timezoneOptions}
            getOptionLabel={option => (option.label ?? timezonesMap.get(option)) || ''}
            isOptionEqualToValue={(option, value) => option.value === value}
            onChange={handleChange}
            {...props}
        />
    );
}