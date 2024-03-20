import { forwardRef, isValidElement } from 'react';
import classnames from 'classnames';

import JoyIconButton from '@mui/joy/IconButton';

import Icon from '../icon/Icon';

const IconButton = forwardRef(({
    icon,
    size,

    as,
    className,
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
            {isValidElement(icon) ? icon :
                <Icon name={icon} size={size} />
            }
        </JoyIconButton>
    );
});

IconButton.displayName = 'IconButton';

export default IconButton;