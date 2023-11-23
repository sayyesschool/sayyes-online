import { forwardRef, isValidElement } from 'react';
import classnames from 'classnames';

import JoyTab from '@mui/joy/Tab';

import Icon from '../icon/Icon';
import Text from '../text/Text';

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

            {icon && (isValidElement(icon) ? icon :
                <Icon>{icon}</Icon>
            )}

            {children}

            {end}
        </JoyTab>
    );
});

Tab.displayName = 'Tab';

export default Tab;