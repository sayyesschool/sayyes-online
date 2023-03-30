import { forwardRef } from 'react';
import classnames from 'classnames';

import JoySwitch from '@mui/joy/Switch';

const Switch = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Switch', className);

    return (
        <JoySwitch
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

export default Switch;