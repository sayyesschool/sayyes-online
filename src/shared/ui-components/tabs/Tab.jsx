import { forwardRef, isValidElement } from 'react';

import JoyTab from '@mui/joy/Tab';
import classnames from 'classnames';

import Icon from '../icon/Icon';

const Tab = forwardRef(({
    icon,
    start,
    content,
    end,
    color,

    as,
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Tab', className);

    return (
        <JoyTab
            ref={ref}
            component={as}
            className={classNames}
            color={color}
            {...props}
        >
            {start}

            {icon && (isValidElement(icon) ?
                icon :
                <Icon>{icon}</Icon>
            )}

            {children}
            {end}
        </JoyTab>
    );
});

Tab.displayName = 'Tab';

export default Tab;