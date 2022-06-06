import { FormDropdown as FluentFormDropdown } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function FormDropdown({ value, label, search, required, ...props }) {
    return (
        <FluentFormDropdown
            value={value}
            label={!required ? label : {
                content: label,
                required: true
            }}
            toggleIndicator={<Icon>expand_more</Icon>}
            clearIndicator={<Icon>clear</Icon>}
            search={search}
            defaultSearchQuery={search ? value : undefined}
            fluid
            {...props}
        />
    );
}