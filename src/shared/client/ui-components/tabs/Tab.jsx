import { forwardRef, isValidElement } from 'react';
import classnames from 'classnames';

import JoyTab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

import Icon from '../icon/Icon';

const Tab = forwardRef(({
    icon,
    start,
    content,
    end,

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
            {...props}
        >
            {icon &&
                <ListItemDecorator>
                    {isValidElement(icon) ? icon :
                        <Icon>{icon}</Icon>
                    }
                </ListItemDecorator>
            }

            {children}
        </JoyTab>
    );
});

export default Tab;