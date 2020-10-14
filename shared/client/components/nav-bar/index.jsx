import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Icon,
    Tab
} from 'mdc-react';

export default function NavBar({ items }) {
    const location = useLocation();

    return (
        <nav className="nav-bar mdc-tab-bar">
            {items.map(item =>
                <Tab
                    key={item.key}
                    component={NavLink}
                    to={item.url}
                    exact={item.exact}
                    icon={<Icon>{item.icon}</Icon>}
                    label={item.text}
                    active={item.exact ? location.pathname === item.url : location.pathname.includes(item.url)}
                    minWidth
                />
            )}
        </nav>
    );
}