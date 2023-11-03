import { forwardRef } from 'react';
import classnames from 'classnames';

import Box from '@mui/system/Box';

import Chip from './Chip';

const ChipGroup = forwardRef(({
    chips,
    color,
    size,
    variant,
    align,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-ChipGroup', className);

    return (
        <Box
            ref={ref}
            className={classNames}
            display="flex"
            gap=".25rem"
            justifyContent={align}
            {...props}
        >
            {chips?.map(chip =>
                <Chip {...chip} />
            )}

            {children}
        </Box>
    );
});

Chip.Group = ChipGroup;

export default ChipGroup;