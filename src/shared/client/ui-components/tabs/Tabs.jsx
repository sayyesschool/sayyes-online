import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTabs from '@mui/joy/Tabs';

import TabList from './TabList';

const Tabs = forwardRef(({
    items,
    color,
    variant,
    tabColor,
    tabVariant,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-Tabs', className);

    return (
        <JoyTabs
            ref={ref}
            className={classNames}
            {...props}
        >
            {items &&
                <TabList
                    items={items}
                    color={color}
                    variant={variant}
                    tabColor={tabColor}
                    tabVariant={tabVariant}
                />
            }

            {children}
        </JoyTabs>
    );
});

export default Tabs;