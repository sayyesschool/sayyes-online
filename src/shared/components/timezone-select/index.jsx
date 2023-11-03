import { FormAutocomplete } from 'shared/ui-components';
import { timezones, timezonesMap } from 'shared/data/timezones';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    label: item.text
}));

export default function TimeZoneSelect({
    name = 'timezone',
    label = 'Часовой пояс',

    ...props
}) {
    return (
        <FormAutocomplete
            name={name}
            label={label}
            options={timezoneOptions}
            getOptionLabel={option => (option.label ?? timezonesMap.get(option)) || ''}
            isOptionEqualToValue={(option, value) => option.value === value}
            {...props}
        />
    );
}