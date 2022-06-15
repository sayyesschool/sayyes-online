import { useLocation, NavLink } from 'react-router-dom';

import Tabs from 'shared/components/tabs';

export default function NavBar({ items }) {
    const location = useLocation();

    return (
        <Tabs
            as="nav"
            className="nav-bar"
            items={items.map(item => ({
                key: item.key,
                as: NavLink,
                to: item.url,
                exact: item.exact,
                icon: item.icon,
                content: item.text,
                active: item.exact ? location.pathname === item.url : location.pathname.includes(item.url)
            }))}
        />
    );
}