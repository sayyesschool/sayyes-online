import { forwardRef } from 'react';

import JoySkeleton from '@mui/joy/Skeleton';
import classnames from 'classnames';

const Skeleton = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Skeleton', className);

    return (
        <JoySkeleton
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;