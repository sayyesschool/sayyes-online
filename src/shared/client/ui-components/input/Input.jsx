import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyInput from '@mui/joy/Input';

const Input = forwardRef(({
    start,
    end,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Input', className);

    return (
        <JoyInput
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        />
    );
});

export default Input;