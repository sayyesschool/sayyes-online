import { NavLink } from 'react-router-dom';
import {
    List
} from 'mdc-react';
import classnames from 'classnames';

export default function NavList({ items, requests }) {
    return (
        <List element="nav" className="nav-list">
            {items.map(item =>
                <List.Item
                    key={item.key}
                    component={NavLink}
                    to={item.url}
                    exact={item.exact}
                    className={classnames({ 'mdc-list-item--indented': item.indent })}
                    activeClassName="mdc-list-item--activated"
                    icon={item.icon}
                    text={item.text}
                    meta={item.key === 'requests' && requests?.length > 0 && requests.length}
                />
            )}
        </List>
    );
}