import { forwardRef } from 'react';

import Box from '@mui/system/Box';
import classnames from 'classnames';

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
                <Chip
                    key={chip.key}
                    color={color}
                    size={size}
                    variant={variant}
                    {...chip}
                />
            )}

            {children}
        </Box>
    );
});

ChipGroup.displayName = 'ChipGroup';

Chip.Group = ChipGroup;

export default ChipGroup;