import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyRadioGroup from '@mui/joy/RadioGroup';

import Radio from '../radio/Radio';

const RadioGroup = forwardRef(({
    items,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-RadioGroup', className);

    return (
        <JoyRadioGroup
            ref={ref}
            className={classNames}
            {...props}
        >
            {items?.map(item => (
                <Radio {...item} />
            ))}

            {children}
        </JoyRadioGroup>
    );
});

export default RadioGroup;