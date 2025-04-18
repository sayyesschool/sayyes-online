import { forwardRef, useCallback } from 'react';

import JoyAutocomplete from '@mui/joy/Autocomplete';
import JoyAutocompleteOption from '@mui/joy/AutocompleteOption';
import classnames from 'classnames';

const Autocomplete = forwardRef(({
    name,
    start,
    end,
    onChange,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Autocomplete', className);

    const handleChange = useCallback((event, _value, reason) => {
        const value = typeof _value === 'object' ? _value?.value : _value;

        onChange?.({
            target: {
                name,
                value
            }
        }, value, reason);
    }, [name, onChange]);

    return (
        <JoyAutocomplete
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            slotProps={{
                clearIndicator: {
                    type: 'button'
                }
            }}
            onChange={handleChange}
            {...props}
        />
    );
});

Autocomplete.displayName = 'Autocomplete';
Autocomplete.Option = JoyAutocompleteOption;

export {
    JoyAutocompleteOption as AutocompleteOption,
    Autocomplete as default
};