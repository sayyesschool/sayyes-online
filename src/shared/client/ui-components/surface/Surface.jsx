import { forwardRef } from 'react';

import Sheet from '@mui/joy/Sheet';

const Surface = forwardRef((props, ref) => {
    return (
        <Sheet
            ref={ref}
            {...props}
        />
    );
});

export default Surface;