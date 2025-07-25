import { useRouteMatch } from 'react-router-dom';

import NavBar from 'shared/components/nav-bar';
import UserMenu from 'shared/components/user-menu';
import { APP_DOMAIN, AUTH_URL, LK_URL } from 'shared/constants';
import { UserDomainLabel } from 'shared/data/user';
import cn from 'shared/utils/classnames';

import styles from './AppBar.module.scss';

export default function AppBar({
    user,
    routes,
    ...props
}) {
    const match = useRouteMatch('/:path?');

    console.log(user);

    return (
        <div className={cn('AppBar', styles.root)} {...props}>
            <div className={styles.logo}>
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
                className={styles.menu}
                user={user}
                items={[
                    ...user.domains.map(domain => ({
                        key: domain,
                        as: 'a',
                        href: `//${domain}.${APP_DOMAIN}`,
                        content: UserDomainLabel[domain]
                    })),
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