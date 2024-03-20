import { NavLink } from 'react-router-dom';

import { Icon, Text, Tabs, TabList, Tab } from 'shared/ui-components';

export default function NavBar({ items, ...props }) {
    return (
        <Tabs
            className="NavBar"
            orientation="vertical"
            {...props}
        >
            <TabList disableUnderline>
                {items.map(item =>
                    <NavBarItem key={item.key} {...item} />
                )}
            </TabList>
        </Tabs>
    );
}

function NavBarItem({ icon, text, to, exact }) {
    return (
        <Tab
            component={NavLink}
            to={to}
            exact={exact}
            value={to}
            className="NavBarItem"
            activeClassName="NavBarItem--active"
            orientation="vertical"
            indicatorPlacement="left"
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