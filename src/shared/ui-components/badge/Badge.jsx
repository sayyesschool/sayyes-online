import { forwardRef } from 'react';

import JoyBadge from '@mui/joy/Badge';
import classnames from 'classnames';

const Badge = forwardRef(({
    content,
    inset,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Badge', className);

    return (
        <JoyBadge
            ref={ref}
            className={classNames}
            badgeContent={content}
            badgeInset={inset}
            {...props}
        />
    );
});

Badge.displayName = 'Badge';

export default Badge;