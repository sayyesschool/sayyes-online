import { useCallback } from 'react';
import { FormRadioGroup as FluentFormRadioGroup } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

export default function FormRadioGroup({ name, value, label, items, required, onChange, ...props }) {
    const handleChange = useCallback((event, item) => {
        onChange(event, { name, value: item.value });
    }, [name, onChange]);

    return (
        <FluentFormRadioGroup
            label={!required ? label : {
                content: label,
                required: true
            }}
            checkedValue={value}
            items={items.map(item => ({
                ...item,
                indicator: <Icon>radio_button_unchecked</Icon>,
                checkedIndicator: <Icon>radio_button_checked</Icon>
            }))}
            onCheckedValueChange={handleChange}
            {...props}
        />
    );
}