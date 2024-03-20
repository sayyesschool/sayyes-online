import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyLink from '@mui/joy/Link';

const Link = forwardRef(({
    content,

    as,
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Link', className);

    return (
        <JoyLink
            ref={ref}
            component={as}
            className={classNames}
            {...props}
        >
            {children}
        </JoyLink>
    );
});

Link.displayName = 'Link';

export default Link;