import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import AppShell from 'shared/components/app-shell';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import Account from 'lk/components/account';

import styles from './App.module.scss';

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <AppShell className={styles.root}>
            <AppHeader
                user={user}
            />

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