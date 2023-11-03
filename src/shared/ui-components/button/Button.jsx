import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyButton from '@mui/joy/Button';

import Icon from 'shared/ui-components/icon';

const Button = forwardRef(({
    icon,
    start,
    content,
    end,
    size,

    as,
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Button', className);

    return (
        <JoyButton
            ref={ref}
            component={as}
            className={classNames}
            startDecorator={icon ?
                <Icon size={size}>{icon}</Icon> :
                start
            }
            endDecorator={end}
            size={size}
            {...props}
        >
            {children}
        </JoyButton>
    );
});

export default Button;