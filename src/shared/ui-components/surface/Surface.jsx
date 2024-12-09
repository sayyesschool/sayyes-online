import { forwardRef } from 'react';

import Sheet from '@mui/joy/Sheet';
import classnames from 'classnames';

const Surface = forwardRef(({ className, elevated, ...props }, ref) => {
    const classNames = classnames(
        className,
        'ui-Surface',
        elevated && 'ui-Surface--elevated'
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