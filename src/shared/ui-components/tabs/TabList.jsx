import { forwardRef, isValidElement } from 'react';

import JoyTabList from '@mui/joy/TabList';
import classnames from 'classnames';

import Tab from './Tab';

const TabList = forwardRef(({
    items,
    tabColor,
    tabVariant,
    disableIndicator,
    indicatorInset,

    children,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-TabList', className);

    return (
        <JoyTabList
            ref={ref}
            className={classNames}
            {...props}
        >
            {items?.map(item => isValidElement(item) ?
                item :
                <Tab
                    key={item.key}
                    color={tabColor}
                    variant={tabVariant}
                    disableIndicator={disableIndicator}
                    indicatorInset={indicatorInset}
                    {...item}
                />
            )}

            {children}
        </JoyTabList>
    );
});

TabList.displayName = 'TabList';

export default TabList;