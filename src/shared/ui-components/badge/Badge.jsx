import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyBadge from '@mui/joy/Badge';

const Badge = forwardRef(({
    content,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Badge', className);

    return (
        <JoyBadge
            ref={ref}
            className={classNames}
            badgeContent={content}
            {...props}
        />
    );
});

Badge.displayName = 'Badge';

export default Badge;