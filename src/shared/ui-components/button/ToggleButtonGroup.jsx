import { forwardRef } from 'react';

import JoyToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import classnames from 'classnames';

import Button from './Button';

const ToggleButtonGroup = forwardRef(({
    buttons,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-ToggleButtonGroup', className);

    return (
        <JoyToggleButtonGroup
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
        </JoyToggleButtonGroup>
    );
});

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

Button.ToggleGroup = ToggleButtonGroup;

export default ToggleButtonGroup;