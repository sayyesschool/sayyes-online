import { forwardRef } from 'react';

import Box from '@mui/joy/Box';
import cn from 'classnames';

const GridItem = forwardRef(({
    span,
    xs,
    sm,
    md,
    lg,
    xl,

    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(className, 'ui-GridItem', {
        [`ui-GridItem--${span}`]: span,
        [`ui-GridItem--${xs}-xs`]: xs,
        [`ui-GridItem--${sm}-sm`]: sm,
        [`ui-GridItem--${md}-md`]: md,
        [`ui-GridItem--${lg}-lg`]: lg,
        [`ui-GridItem--${xl}-xl`]: xl
    });
    const gridColumn = span ? `span ${span}` : {
        xs: xs && `span ${xs}`,
        sm: sm && `span ${sm}`,
        md: md && `span ${md}`,
        lg: lg && `span ${lg}`,
        xl: xl && `span ${xl}`
    };

    return (
        <Box
            ref={ref}
            className={classNames}
            sx={{ gridColumn }}
            {...props}
        >
            {children}
        </Box>
    );
});

GridItem.displayName = 'GridItem';

export default GridItem;