import { NavLink } from 'react-router-dom';

import { Icon, Text } from 'shared/ui-components';

import './index.scss';

export default function NavBar({ items }) {
    return (
        <nav className="nav-bar">
            <ul>
                {items.map(item =>
                    <li key={item.key}>
                        <NavLink className="nav-bar__item" activeClassName="nav-bar__item--active" to={item.url} exact={item.exact}>
                            {item.icon &&
                                <Icon className="nav-bar__item__icon" name={item.icon} />
                            }

                            <Text className="nav-bar__item__text">{item.text}</Text>
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}