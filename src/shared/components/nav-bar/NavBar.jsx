import { NavLink } from 'react-router-dom';

import { Icon, Tab, TabList, Tabs, Text } from 'shared/ui-components';

export default function NavBar({ items, orientation, ...props }) {
    return (
        <Tabs
            className="NavBar"
            orientation={orientation}
            {...props}
        >
            <TabList disableUnderline>
                {items.map(item =>
                    <NavBarItem
                        key={item.key}
                        orientation={orientation}
                        {...item}
                    />
                )}
            </TabList>
        </Tabs>
    );
}

const IndicatorPlacementByOrientation = {
    horizontal: 'bottom',
    vertical: 'right'
};

function NavBarItem({ icon, text, to, exact, orientation, ...props }) {
    return (
        <Tab
            component={NavLink}
            to={to}
            exact={exact}
            value={to}
            className="NavBarItem"
            activeClassName="NavBarItem--active"
            orientation={orientation}
            indicatorPlacement={IndicatorPlacementByOrientation[orientation]}
            {...props}
        >
            <Icon
                className="NavBarItem__icon"
                name={icon}
            />

            <Text
                className="NavBarItem__text"
                type="body-xs"
                content={text}
                noWrap
            />
        </Tab>
    );
}