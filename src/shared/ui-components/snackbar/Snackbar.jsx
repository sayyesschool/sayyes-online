import { forwardRef } from 'react';
import classnames from 'classnames';

import MuiSnackbar from '@mui/joy/Snackbar';

const Snackbar = forwardRef(({
    content,
    start,
    end,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Snackbar', className);

    return (
        <MuiSnackbar
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </MuiSnackbar>
    );
});

export default Snackbar;