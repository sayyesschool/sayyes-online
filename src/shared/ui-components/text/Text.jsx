import { forwardRef } from 'react';

import JoyTypography from '@mui/joy/Typography';
import classnames from 'classnames';

const Text = forwardRef(({
    content,
    type,
    start,
    end,
    inline,

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
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyTypography>
    );
});

Text.displayName = 'Text';

export default Text;