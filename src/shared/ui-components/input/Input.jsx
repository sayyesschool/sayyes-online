import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyInput from '@mui/joy/Input';

const Input = forwardRef(({
    start,
    end,
    inputRef,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Input', className);

    return (
        <JoyInput
            ref={ref}
            slotProps={{
                input: {
                    ref: inputRef
                }
            }}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;