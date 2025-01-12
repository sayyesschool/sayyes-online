import { forwardRef } from 'react';

import Sheet from '@mui/joy/Sheet';
import classnames from 'classnames';

const Surface = forwardRef(({ className, elevated, padding, ...props }, ref) => {
    const classNames = classnames(
        className,
        'ui-Surface',
        elevated && 'ui-Surface--elevated',
        padding && `ui-Surface--padding-${padding}`
    );

    return (
        <Sheet
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Surface.displayName = 'Surface';

export default Surface;