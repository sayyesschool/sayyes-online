import {
    FormDropdown
} from '@fluentui/react-northstar';

import timezones from 'shared/../data/timezones';

export default function TimeZoneSelect({
    name = 'timezone',
    label = 'Часовой пояс',

    ...props
}) {
    return (
        <FormDropdown
            name={name}
            label={label}
            items={timezones.map(item => ({
                key: item.value,
                value: item.value,
                content: item.text
            }))}
            fluid
            {...props}
        />
    );
}