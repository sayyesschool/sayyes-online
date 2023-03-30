import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTypography from '@mui/joy/Typography';

const Heading = forwardRef(({
    type,
    content,

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
            {...props}
        >
            {children}
        </JoyTypography>
    );
});

export default Heading;