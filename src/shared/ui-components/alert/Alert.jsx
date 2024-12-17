import { forwardRef } from 'react';

import JoyAlert from '@mui/joy/Alert';
import classnames from 'classnames';

const Alert = forwardRef(({
    content,
    start,
    end,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Alert', className);

    return (
        <JoyAlert
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyAlert>
    );
});

Alert.displayName = 'Alert';

export default Alert;