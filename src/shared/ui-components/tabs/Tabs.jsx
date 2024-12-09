import { forwardRef } from 'react';

import JoyTabs from '@mui/joy/Tabs';
import classnames from 'classnames';

import TabList from './TabList';

const Tabs = forwardRef(({
    items,
    color,
    variant,
    tabColor,
    tabVariant,
    disableIndicator,
    disableUnderline,
    indicatorInset,

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
                    disableIndicator={disableIndicator}
                    disableUnderline={disableUnderline}
                    indicatorInset={indicatorInset}
                />
            }

            {children}
        </JoyTabs>
    );
});

Tabs.displayName = 'Tabs';

export default Tabs;