import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyChip from '@mui/joy/Chip';

const Chip = forwardRef(({
    start,
    content,
    end,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Chip', className);

    return (
        <JoyChip
            ref={ref}
            className={classNames}
            startDecorator={start}
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyChip>
    );
});

export default Chip;