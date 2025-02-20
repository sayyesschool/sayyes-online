import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppFooter from 'shared/components/app-footer/AppFooter';
import AppHeader from 'shared/components/app-header';
import AppShell from 'shared/components/app-shell';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import { LearnerPage, TeacherPage } from 'club/components/home';

import styles from './App.module.scss';

const PageByRole = {
    learner: LearnerPage,
    teacher: TeacherPage
};

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    const HomePage = PageByRole[user.role];

    return (
        <AppShell className={styles.root}>
            <AppHeader
                logoVariant="speaking-club_white"
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
        </AppShell>
    );
}