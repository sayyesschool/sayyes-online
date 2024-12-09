import { forwardRef } from 'react';

import JoyCircularProgress from '@mui/joy/CircularProgress';

const CircularProgress = forwardRef(({
    content,

    children = content,
    ...props
}, ref) => {
    return (
        <JoyCircularProgress ref={ref} {...props}>
            {children}
        </JoyCircularProgress>
    );
});

CircularProgress.displayName = 'CircularProgress';

export default CircularProgress;