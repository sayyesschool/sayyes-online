import { forwardRef } from 'react';

import Sheet from '@mui/joy/Sheet';
import classnames from 'classnames';

const Surface = forwardRef(({ className, ...props }, ref) => {
    const classNames = classnames(className, 'ui-Surface');

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