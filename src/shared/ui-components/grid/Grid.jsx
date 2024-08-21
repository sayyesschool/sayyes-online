import { forwardRef } from 'react';

import JoyGrid from '@mui/joy/Grid';

import GridItem from './GridItem';

const Gap = {
    smallest: .5,
    smaller: 1,
    small: 1.5,
    medium: 2,
    large: 3,
    larger: 4,
    largest: 5
};

const Grid = forwardRef(({
    gap,

    ...props
}, ref) => {
    return (
        <JoyGrid
            ref={ref}
            spacing={Gap[gap] || Number(gap)}
            container
            {...props}
        />
    );
});

Grid.Item = GridItem;

Grid.displayName = 'Grid';

export default Grid;