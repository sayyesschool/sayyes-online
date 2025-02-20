import { forwardRef, isValidElement } from 'react';

import JoyIconButton from '@mui/joy/IconButton';
import classnames from 'classnames';

import Icon from '../icon/Icon';

const IconButton = forwardRef(({
    icon,
    size,

    as,
    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-IconButton', className);

    return (
        <JoyIconButton
            ref={ref}
            component={as}
            className={classNames}
            size={size}
            color="neutral"
            variant="plain"
            {...props}
        >
            {isValidElement(icon) ?
                icon :
                <Icon
                    name={icon}
                    size={size}
                />
            }

            {children}
        </JoyIconButton>
    );
});

IconButton.displayName = 'IconButton';

export default IconButton;