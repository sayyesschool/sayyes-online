import { forwardRef } from 'react';

import Box from '@mui/system/Box';
import classnames from 'classnames';

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
            {children}

            {buttons?.filter(Boolean).map(button =>
                <IconButton
                    key={button.key}
                    color={color}
                    size={size}
                    variant={variant}
                    {...button}
                />
            )}
        </Box>
    );
});

IconButtonGroup.displayName = 'IconButtonGroup';

IconButton.Group = IconButtonGroup;

export default IconButtonGroup;