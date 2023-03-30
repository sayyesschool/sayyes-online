import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

import JoySelect from '@mui/joy/Select';

import Option from './Option';

const Select = forwardRef(({
    start,
    end,
    name,
    options,
    onChange,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Select', className);

    const handleChange = useCallback((event, value) => {
        onChange({
            target: {
                name,
                value: typeof value === 'object' ? value?.value : value
            }
        }, value);
    }, [name, onChange]);

    return (
        <JoySelect
            ref={ref}
            className={classNames}
            name={name}
            startDecorator={start}
            endDecorator={end}
            onChange={handleChange}
            {...props}
        >
            {options?.map(option =>
                <Option {...option} />
            )}
        </JoySelect>
    );
});

Select.Option = Option;

export default Select;