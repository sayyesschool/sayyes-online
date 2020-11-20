import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Icon,
    List
} from 'mdc-react';
import classnames from 'classnames';

export default function NavList({ items, requests }) {
    return (
        <List element="nav" className="nav-list">
            {items.map(item =>
                item ?
                    <List.Item
                        key={item.key}
                        component={NavLink}
                        to={item.url}
                        exact={item.exact}
                        className={classnames({ 'mdc-list-item--indented': item.indent })}
                        activeClassName="mdc-list-item--activated"
                        graphic={<Icon>{item.icon}</Icon>}
                        text={item.text}
                        meta={item.key === 'requests' && requests?.length > 0 && requests.length}
                    />
                    :
                    <List.Divider />
            )}
        </List>
    );
}