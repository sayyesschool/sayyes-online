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
    const classNames = classnames('ui-Link');

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

export default Link;