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
                as={NavLink}
                className="NavBarItem__link"
                to={to}
                exact={exact}
                activeClassName="NavBarItem__link--active"
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
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