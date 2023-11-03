import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTypography from '@mui/joy/Typography';

const Heading = forwardRef(({
    type,
    content,
    start,
    end,

    as,
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Heading');

    return (
        <JoyTypography
            ref={ref}
            component={as}
            className={classNames}
            level={type}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyTypography>
    );
});

Heading.displayName = 'Heading';

export default Heading;