import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import Account from 'lk/components/account';

import './index.scss';

// TODO: в папке shared находятся компоненты которые не используются, можно их удалить?
export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <div className="App">
            <AppHeader
                user={user}
            />

            <AppContent>
                <Switch>
                    <Route
                        path="/" component={Account}
                        exact
                    />
                </Switch>
            </AppContent>
        </div>
    );
}