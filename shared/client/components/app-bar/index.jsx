import { NavLink } from 'react-router-dom';
import { Menu } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

import './index.scss';

export default function AppBar({
    user,
    items,
    ...props
}) {
    return (
        <nav className="app-bar" {...props}>
            <Menu
                items={items.map(item => ({
                    key: item.key,
                    as: NavLink,
                    to: item.url,
                    icon: <Icon name={item.icon} size="medium" />,
                    content: item.text,
                    //active: location.pathname.startsWith(item.url)
                }))}
                primary
            />
        </nav>
    );
}