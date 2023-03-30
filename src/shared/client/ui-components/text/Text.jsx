import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTypography from '@mui/joy/Typography';

const Text = forwardRef(({
    content,
    type,

    as,
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Text', className);

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

export default Text;