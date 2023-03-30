import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';

const Breadcrumbs = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Breadcrumbs', className);

    return (
        <JoyBreadcrumbs
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

export default Breadcrumbs;