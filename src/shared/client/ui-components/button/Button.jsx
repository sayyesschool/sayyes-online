import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyButton from '@mui/joy/Button';

import Icon from 'shared/ui-components/icon';

const Button = forwardRef(({
    icon,
    start,
    content,
    end,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Button', className);

    return (
        <JoyButton
            ref={ref}
            className={classNames}
            startDecorator={icon ?
                <Icon>{icon}</Icon> :
                start
            }
            endDecorator={end}
            {...props}
        >
            {children}
        </JoyButton>
    );
});

export default Button;