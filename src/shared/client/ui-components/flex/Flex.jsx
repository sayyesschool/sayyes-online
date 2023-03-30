import { forwardRef } from 'react';
import classnames from 'classnames';

import Stack from '@mui/joy/Stack';

const Flex = forwardRef(({
    direction = 'row',
    column,
    row,
    gap,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Flex', {
        [`ui-Flex--gap-${gap}`]: gap
    }, className);

    return (
        <Stack
            ref={ref}
            className={classNames}
            direction={column ? 'column' : row ? 'row' : direction}
            {...props}
        />
    );
});

export default Flex;