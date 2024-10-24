import { forwardRef } from 'react';

import JoySnackbar from '@mui/joy/Snackbar';
import classnames from 'classnames';

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
        <JoySnackbar
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoySnackbar>
    );
});

Snackbar.displayName = 'Snackbar';

export default Snackbar;