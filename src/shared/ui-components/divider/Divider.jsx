import { forwardRef } from 'react';

import JoyDivider from '@mui/joy/Divider';
import classnames from 'classnames';

const Divider = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Divider', className);

    return (
        <JoyDivider
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Divider.displayName = 'Divider';

export default Divider;