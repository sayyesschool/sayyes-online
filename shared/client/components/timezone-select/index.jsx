import React from 'react';
import {
    Select
} from 'mdc-react';

import timezones from 'shared/../data/timezones';

export default function TimeZoneSelect({
    name = 'timezone',
    label = 'Часовой пояс',

    ...props
}) {
    return (
        <Select
            name={name}
            label={label}
            options={timezones.map(item => ({
                key: item.value,
                value: item.value,
                text: item.text
            }))}
            menuProps={{
                fullWidth: true,
                style: { maxHeight: '300px' }
            }}
            filled
            {...props}
        />
    );
}