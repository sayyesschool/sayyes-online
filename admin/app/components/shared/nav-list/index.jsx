import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Icon,
    List, ListItem
} from 'mdc-react';

export default function NavList({ items, requests }) {
    return (
        <List element="nav" className="nav-list">
            {items.map(item =>
                <ListItem
                    key={item.key}
                    component={NavLink}
                    to={item.url}
                    exact={item.exact}
                    activeClassName="mdc-list-item--activated"
                    graphic={<Icon>{item.icon}</Icon>}
                    text={item.text}
                    meta={item.key === 'requests' && requests?.length > 0 && requests.length}
                />
            )}
        </List>
    );
}