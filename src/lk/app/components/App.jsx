import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNav from 'shared/components/app-nav';
import AppNotification from 'shared/components/app-notification';
import AppShell from 'shared/components/app-shell';
import LoadingIndicator from 'shared/components/loading-indicator';
import { APP_DOMAIN } from 'shared/constants';
import { UserDomainIcons, UserDomainLabel } from 'shared/data/user';
import { useUser } from 'shared/hooks/user';

import Account from 'lk/components/account';

import styles from './App.module.scss';

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    const navItems = user.domains
        .filter(domain => domain !== 'lk')
        .map(domain => ({
            key: domain,
            as: 'a',
            href: `//${domain}.${APP_DOMAIN}`,
            text: UserDomainLabel[domain],
            icon: UserDomainIcons[domain]
        }));

    return (
        <AppShell className={styles.root}>
            <AppHeader
                user={user}
            >
                <AppNav
                    items={navItems}
                    orientation="horizontal"
                    invertedColors
                />
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route
                        path="/"
                        component={Account}
                        exact
                    />
                </Switch>
            </AppContent>

            <AppNotification />
        </AppShell>
    );
}