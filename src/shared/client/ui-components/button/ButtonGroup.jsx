import { forwardRef } from 'react';
import classnames from 'classnames';

import Box from '@mui/system/Box';

import Button from './Button';

const ButtonGroup = forwardRef(({
    buttons,
    color,
    size,
    variant,
    align,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-ButtonGroup', className);

    return (
        <Box
            ref={ref}
            className={classNames}
            display="flex"
            gap=".25rem"
            justifyContent={align}
            {...props}
        >
            {buttons?.map(button =>
                <Button {...button} />
            )}

            {children}
        </Box>
    );
});

Button.Group = ButtonGroup;

export default ButtonGroup;