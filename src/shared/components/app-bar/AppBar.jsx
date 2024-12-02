import { useRouteMatch } from 'react-router-dom';

import NavBar from 'shared/components/nav-bar';
import UserMenu from 'shared/components/user-menu';
import { AUTH_URL, LK_URL } from 'shared/constants';

export default function AppBar({
    user,
    routes,
    ...props
}) {
    const match = useRouteMatch('/:path?');

    return (
        <div className="AppBar" {...props}>
            <div className="AppBar__logo">
                <img src="https://static.sayes.ru/images/logos/sayyes-purple.png" />
            </div>

            <NavBar
                selectedItemValue={match.url}
                items={routes.filter(route => !route.hidden).map(route => ({
                    key: route.id,
                    icon: route.icon,
                    text: route.name,
                    to: route.path,
                    exact: route.exact
                }))}
                orientation="vertical"
            />

            <UserMenu
                user={user}
                items={[
                    {
                        key: 'account',
                        as: 'a',
                        href: LK_URL,
                        content: 'Личный кабинет'
                    },
                    {
                        key: 'logout',
                        as: 'a',
                        href: `${AUTH_URL}/logout`,
                        content: 'Выйти'
                    }
                ]}
            />
        </div>
    );
}