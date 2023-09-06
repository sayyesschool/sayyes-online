import { forwardRef, useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

import MuiSnackbar from '@mui/base/Snackbar';
import Alert from '../alert';

const Snackbar = forwardRef(({
    content,
    start,
    end,
    open,
    color = 'info',
    size = 'md',
    variant = 'soft',
    onClose,

    className,
    children = content,
    ...props
}, ref) => {
    // const [open, setOpen] = useState(false);
    // const [exited, setExited] = useState(true);
    // const nodeRef = useRef(null);

    const handleClose = useCallback((_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }, []);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);

    const handleOnEnter = useCallback(() => {
        setExited(false);
    }, []);

    const handleOnExited = useCallback(() => {
        setExited(true);
    }, []);

    const classNames = classnames('ui-Snackbar', {
        'ui-Snackbar--open': open
    }, className);

    return (
        <MuiSnackbar
            ref={ref}
            className={classNames}
            open={open}
            disableWindowBlurListener
            onClose={onClose}
            {...props}
        >
            <Alert
                content={content}
                start={start}
                end={end}
                color={color}
                size={size}
                variant={variant}
            >
                {children}
            </Alert>
        </MuiSnackbar>
    );
});

export default Snackbar;