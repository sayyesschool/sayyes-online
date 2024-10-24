import { forwardRef } from 'react';

import JoyButtonGroup from '@mui/joy/ButtonGroup';
import classnames from 'classnames';

import Button from './Button';

const ButtonGroup = forwardRef(({
    buttons,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-ButtonGroup', className);

    return (
        <JoyButtonGroup
            ref={ref}
            className={classNames}
            {...props}
        >
            {buttons?.map(button =>
                <Button
                    key={button.key}
                    {...button}
                />
            ) || children}
        </JoyButtonGroup>
    );
});

ButtonGroup.displayName = 'ButtonGroup';

Button.Group = ButtonGroup;

export default ButtonGroup;