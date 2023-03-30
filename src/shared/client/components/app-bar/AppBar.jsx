import { Link } from 'react-router-dom';

import NavBar from 'shared/components/nav-bar';
import UserMenu from 'shared/components/user-menu';

export default function AppBar({
    user,
    routes,
    ...props
}) {
    return (
        <div className="sy-AppBar" {...props}>
            <div className="sy-AppBar__logo">
                <img src="https://static.sayes.ru/images/logos/sayyes-purple.png" />
            </div>

            <NavBar
                items={routes.filter(route => !route.hidden).map(route => ({
                    key: route.id,
                    icon: route.icon,
                    text: route.name,
                    to: route.path,
                    exact: route.exact
                }))}
            />

            <UserMenu
                user={user}
                items={[
                    {
                        key: 'account',
                        as: Link,
                        to: '/account',
                        content: 'Личный кабинет'
                    },
                    {
                        key: 'logout',
                        as: 'a',
                        href: '/logout',
                        content: 'Выйти'
                    }
                ]}
            />
        </div>
    );
}