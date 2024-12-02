import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import { LearnerPage, TeacherPage } from 'club/components/home';
import MeetingPage from 'club/components/meetings/meeting-page';

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
                user={user}
            />

            <AppContent>
                <Switch>
                    <Route
                        path="/" component={HomePage}
                        exact
                    />

                    <Route path="/meetings/:meetingId" component={MeetingPage} />
                </Switch>
            </AppContent>

            <AppNotification />
        </div>
    );
}