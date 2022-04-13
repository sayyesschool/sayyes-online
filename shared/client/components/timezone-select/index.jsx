import FormSelect from 'shared/components/form-select';
import Icon from 'shared/components/material-icon';
import timezones from 'shared/../data/timezones';

const timezoneOptions = timezones.map(item => ({
    key: item.value,
    value: item.value,
    header: item.text
}));

export default function TimeZoneSelect({
    name = 'timezone',
    label = 'Часовой пояс',

    ...props
}) {
    return (
        <FormSelect
            name={name}
            label={label}
            options={timezoneOptions}
            toggleIndicator={<Icon>expand_more</Icon>}
            fluid
            search
            {...props}
        />
    );
}