import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useUser } from 'shared/hooks/user';

import LearnerPage from 'club/components/learner/learner-page';
import ManagerPage from 'club/components/manager/manager-page';
import MeetingPage from 'club/components/meetings/meeting-page';
import TeacherPage from 'club/components/teacher/teacher-page';

const PageByRole = {
    member: LearnerPage,
    manager: ManagerPage,
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