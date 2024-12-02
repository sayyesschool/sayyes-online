import { forwardRef } from 'react';

import Box from '@mui/joy/Box';
import cn from 'classnames';

import GridItem from './GridItem';

const Gap = {
    smallest: .5,
    xxs: .5,
    smaller: 1,
    xs: 1,
    small: 1.5,
    sm: 1.5,
    s: 1.5,
    medium: 2,
    md: 2,
    m: 2,
    large: 3,
    lg: 3,
    l: 3,
    larger: 4,
    xl: 4,
    largest: 5,
    xxl: 5
};

const Grid = forwardRef(({
    columns = 12,
    gap,

    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(className, 'ui-Grid');
    const templateColumns = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : {
        xs: columns.xs && `repeat(${columns.xs}, 1fr)`,
        sm: columns.sm && `repeat(${columns.sm}, 1fr)`,
        md: columns.md && `repeat(${columns.md}, 1fr)`,
        lg: columns.lg && `repeat(${columns.lg}, 1fr)`,
        xl: columns.xl && `repeat(${columns.xl}, 1fr)`
    };

    return (
        <Box
            ref={ref}
            className={classNames}
            sx={{
                display: 'grid',
                gridTemplateColumns: templateColumns,
                gap: Gap[gap]
            }}
            {...props}
        >
            {children}
        </Box>
    );
});

Grid.Item = GridItem;

Grid.displayName = 'Grid';

export default Grid;