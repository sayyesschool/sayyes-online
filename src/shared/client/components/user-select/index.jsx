import { useCallback, useMemo, useState } from 'react';

import api from 'shared/services/api';
import { FormAutocomplete } from 'shared/ui-components';

export default function UserSelect({
    name,
    options,
    resolveUrl,
    onChange,

    ...props
}) {
    const optionsMap = useMemo(() => new Map(options.map(option => [option.value, option.label])), [options]);

    const [results, setResults] = useState();

    const onResolveStudentSuggestions = (query, selectedItems) => {
        if (query) {
            return api.get(`${resolveUrl}?search=${query}`)
                .then(res => res.data)
                .then(data => data.map(item => ({ text: item.fullname })));
        } else {
            return [];
        }
    };

    const handleChange = useCallback((event, options) => {
        onChange({
            target: {
                name,
                value: options.map(o => typeof o === 'string' ? o : o.value)
            }
        });
    }, [name, onChange]);

    return (
        <FormAutocomplete
            className="UserSelect"
            name={name}
            options={options}
            getOptionLabel={option => option.label || optionsMap.get(option)}
            isOptionEqualToValue={(option, value) => option.value === value}
            onChange={handleChange}
            {...props}
        />
    );
}