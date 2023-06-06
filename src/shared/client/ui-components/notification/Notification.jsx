import { forwardRef } from 'react';
import classnames from 'classnames';

import Snackbar from '@mui/base/Snackbar';

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
        <Snackbar
            ref={ref}
            className={classNames}
            open={open}
            // autoHideDuration={5000}
            disableWindowBlurListener
            onClose={onClose}
            {...props}
        >
            {children}
        </Snackbar>
    );
});

export default Notification;