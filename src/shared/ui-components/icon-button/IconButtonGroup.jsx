import { forwardRef } from 'react';
import classnames from 'classnames';
import Box from '@mui/system/Box';

import IconButton from './IconButton';

const IconButtonGroup = forwardRef(({
    buttons,
    color,
    size,
    variant,
    align,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-IconButtonGroup', className);

    return (
        <Box
            ref={ref}
            className={classNames}
            display="inline-flex"
            gap=".25rem"
            justifyContent={align}
            {...props}
        >
            {buttons?.map(button =>
                <IconButton
                    {...button}
                    color={color}
                    size={size}
                    variant={variant}
                />
            )}

            {children}
        </Box>
    );
});

IconButton.Group = IconButtonGroup;

export default IconButtonGroup;