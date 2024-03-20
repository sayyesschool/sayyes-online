import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyLinearProgress from '@mui/joy/LinearProgress';

const LinearProgress = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-LinearProgress', className);

    return (
        <JoyLinearProgress
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

LinearProgress.displayName = 'LinearProgress';

export default LinearProgress;