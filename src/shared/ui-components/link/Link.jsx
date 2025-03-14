import { forwardRef } from 'react';

import JoyLink from '@mui/joy/Link';
import classnames from 'classnames';

const Link = forwardRef(({
    content,
    start,
    end,

    as,
    type,
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
            level={type}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyLink>
    );
});

Link.displayName = 'Link';

export default Link;