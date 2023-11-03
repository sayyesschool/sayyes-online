import { forwardRef } from 'react';

import JoyGrid from '@mui/joy/Grid';

const GridItem = forwardRef(({
    ...props
}, ref) => {
    return (
        <JoyGrid ref={ref} {...props} />
    );
});

export default GridItem;