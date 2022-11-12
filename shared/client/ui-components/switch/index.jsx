import { forwardRef } from 'react';
import { Checkbox } from '@fluentui/react-northstar';

const Switch = forwardRef(({ ...props }, ref) => {
    return (
        <Checkbox ref={ref} toggle {...props} />
    );
});

export default Switch;