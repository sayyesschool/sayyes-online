import { forwardRef } from 'react';

import JoyGrid from '@mui/joy/Grid';

import GridItem from './GridItem';

const Gap = {
    smallest: '.25rem',
    smaller: '.5rem',
    small: '.75rem',
    medium: '1rem',
    large: '1.25rem',
    larger: '1.5rem',
    largest: '1.75rem'
};

const Grid = forwardRef(({
    gap,

    ...props
}, ref) => {
    return (
        <JoyGrid
            ref={ref}
            container
            gap={Gap[gap] || gap}
            {...props}
        />
    );
});

Grid.Item = GridItem;

export default Grid;