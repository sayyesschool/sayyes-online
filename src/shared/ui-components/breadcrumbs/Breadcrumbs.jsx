import { forwardRef } from 'react';

import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';
import classnames from 'classnames';

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

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;