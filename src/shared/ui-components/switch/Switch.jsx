import { forwardRef } from 'react';

import JoySwitch from '@mui/joy/Switch';
import classnames from 'classnames';

const Switch = forwardRef(({
    name,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Switch', className);

    return (
        <JoySwitch
            ref={ref}
            className={classNames}
            slotProps={{
                input: { name }
            }}
            {...props}
        />
    );
});

Switch.displayName = 'Switch';

export default Switch;