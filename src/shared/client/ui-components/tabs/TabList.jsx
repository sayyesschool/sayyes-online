import { forwardRef, isValidElement } from 'react';
import classnames from 'classnames';

import JoyTabList from '@mui/joy/TabList';

import Tab from './Tab';

const TabList = forwardRef(({
    items,
    tabColor,
    tabVariant,

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
            {items?.map(item =>
                isValidElement(item) ? item :
                    <Tab
                        color={tabColor}
                        variant={tabVariant}
                        {...item}
                    />
            )}

            {children}
        </JoyTabList>
    );
});

export default TabList;