import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppFooter from 'shared/components/app-footer/AppFooter';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import { LearnerPage, TeacherPage } from 'club/components/home';

const PageByRole = {
    learner: LearnerPage,
    teacher: TeacherPage
};

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    const HomePage = PageByRole[user.role];

    return (
        <div className="App">
            <AppHeader
                logoUrl={'https://static.sayes.ru/images/logos/sayyes-speaking-club_white.svg'}
                user={user}
            />

            <AppContent>
                <Switch>
                    <Route
                        path="/"
                        component={HomePage}
                        exact
                    />
                </Switch>
            </AppContent>

            <AppFooter
                logoUrl={'https://static.sayes.ru/images/logos/sayyes-speaking-club_purple.svg'}
            />

            <AppNotification />
        </div>
    );
}