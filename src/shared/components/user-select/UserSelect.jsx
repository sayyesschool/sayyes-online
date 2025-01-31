import { useMemo } from 'react';

import { FormAutocomplete } from 'shared/ui-components';

export default function UserSelect({
    name,
    options,
    ...props
}) {
    const optionsMap = useMemo(() => new Map(options.map(option => [option.value, option.label])), [options]);

    return (
        <FormAutocomplete
            className="UserSelect"
            name={name}
            options={options}
            getOptionKey={option => option.value}
            getOptionLabel={option => option.label || optionsMap.get(option)}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            clearOnBlur={false}
            openOnFocus={false}
            {...props}
        />
    );
}