import { Link } from 'react-router-dom';

import UserMenu from 'shared/components/user-menu';

import './index.scss';

export default function AppHeader({
    user,
    children,
    ...props
}) {
    return (
        <header className="app-header" {...props}>
            <Link className="app-header__home-link" to="/">Say Yes Online</Link>

            <UserMenu
                user={user}
                items={[
                    {
                        as: Link,
                        to: '/account',
                        content: 'Личный кабинет'
                    },
                    {
                        as: 'a',
                        href: '/logout',
                        content: 'Выйти'
                    }
                ]}
            />
        </header>
    );
}