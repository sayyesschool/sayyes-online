import { Link } from 'react-router-dom';

import UserMenu from 'shared/components/user-menu';
import { AUTH_URL, LK_URL } from 'shared/constants';

import styles from './AppHeader.module.scss';

export default function AppHeader({
    user,
    logo,
    title,
    children,
    ...props
}) {
    return (
        <header className={styles.root} {...props}>
            <div className={styles.container}>
                <Link className={styles.logo} to="/">{logo}</Link>

                {children &&
                    <div className={styles.content}>{children}</div>
                }

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
        </header>
    );
}