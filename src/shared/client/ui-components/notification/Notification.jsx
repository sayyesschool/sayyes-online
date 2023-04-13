import { forwardRef } from 'react';
import classnames from 'classnames';

import SnackbarUnstyled from '@mui/base/SnackbarUnstyled';

const Notification = forwardRef(({
    open,
    onClose,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Notification', {
        'ui-Notification--open': open
    }, className);

    return (
        <SnackbarUnstyled
            ref={ref}
            className={classNames}
            open={open}
            // autoHideDuration={5000}
            disableWindowBlurListener
            onClose={onClose}
            {...props}
        >
            {children}
        </SnackbarUnstyled>
    );
});

export default Notification;