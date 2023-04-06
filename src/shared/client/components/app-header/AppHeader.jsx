import { Link } from 'react-router-dom';

import UserMenu from 'shared/components/user-menu';

export default function AppHeader({
    user,
    children,
    ...props
}) {
    return (
        <header className="AppHeader" {...props}>
            <Link className="AppHeader__home-link" to="/">Say Yes</Link>

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
        </header>
    );
}