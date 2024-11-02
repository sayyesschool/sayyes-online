import { forwardRef } from 'react';

import Stack from '@mui/joy/Stack';
import classnames from 'classnames';

const Flex = forwardRef(({
    direction = 'row',
    dir = direction,
    column,
    row,
    gap,

    className,
    ...props
}, ref) => {
    const classNames = classnames(className, 'ui-Flex', {
        [`ui-Flex--gap-${gap}`]: gap
    });

    return (
        <Stack
            ref={ref}
            className={classNames}
            direction={column ? 'column' : row ? 'row' : dir}
            useFlexGap
            {...props}
        />
    );
});

Flex.displayName = 'Flex';

export default Flex;