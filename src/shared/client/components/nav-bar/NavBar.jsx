import { NavLink } from 'react-router-dom';

import { Icon, List, ListItem, Text } from 'shared/ui-components';

export default function NavBar({ items, ...props }) {
    return (
        <nav className="NavBar">
            <List size="sm" {...props}>
                {items.map(item =>
                    <NavBarItem key={item.key} {...item} />
                )}
            </List>
        </nav>
    );
}

function NavBarItem({ icon, text, to, exact }) {
    return (
        <ListItem className="NavBarItem">
            <ListItem.Button
                className="NavBarItem__link"
                activeClassName="NavBarItem__link--active"
                component={NavLink}
                to={to}
                exact={exact}
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                }}
            >
                {icon &&
                    <Icon className="NavBarItem__icon" name={icon} />
                }

                <Text className="NavBarItem__text" type="body4" noWrap>{text}</Text>
            </ListItem.Button>
        </ListItem>
    );
}