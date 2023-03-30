import { forwardRef, isValidElement } from 'react';
import classnames from 'classnames';

import JoyIconButton from '@mui/joy/IconButton';

import Icon from '../icon/Icon';

const IconButton = forwardRef(({
    icon,

    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-IconButton', className);

    return (
        <JoyIconButton
            ref={ref}
            className={classNames}
            color="neutral"
            variant="plain"
            {...props}
        >
            {isValidElement(icon) ? icon : <Icon name={icon} />}
        </JoyIconButton>
    );
});

export default IconButton;