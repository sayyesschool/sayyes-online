import { forwardRef } from 'react';

import JoyCircularProgress from '@mui/joy/CircularProgress';

const CircularProgress = forwardRef(({
    ...props
}, ref) => {
    return (
        <JoyCircularProgress ref={ref} {...props} />
    );
});

export default CircularProgress;