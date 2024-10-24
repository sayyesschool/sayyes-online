import { forwardRef } from 'react';

import JoyTypography from '@mui/joy/Typography';
import classnames from 'classnames';

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
    const classNames = classnames('ui-Heading', className);

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