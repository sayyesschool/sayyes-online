import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

import JoyAutocomplete from '@mui/joy/Autocomplete';

const Autocomplete = forwardRef(({
    name,
    start,
    end,
    onChange,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Autocomplete', className);

    const handleChange = useCallback((event, value) => {
        onChange({
            target: {
                name,
                value: typeof value === 'object' ? value?.value : value
            }
        }, value);
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

export default Autocomplete;