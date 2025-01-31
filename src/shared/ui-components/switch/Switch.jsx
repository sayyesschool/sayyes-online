import { forwardRef } from 'react';

import JoySwitch from '@mui/joy/Switch';
import classnames from 'classnames';

const Switch = forwardRef(({
    name,
    thumb,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Switch', className);

    return (
        <JoySwitch
            ref={ref}
            className={classNames}
            slotProps={{
                input: { name },
                thumb: thumb && { children: thumb }
            }}
            {...props}
        />
    );
});

Switch.displayName = 'Switch';

export default Switch;