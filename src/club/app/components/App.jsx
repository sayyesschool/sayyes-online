import { Route, Switch } from 'react-router-dom';

import { useUser } from 'shared/hooks/user';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';

import LearnerPage from 'app/components/learner/learner-page';
import ManagerPage from 'app/components/manager/manager-page';
import MeetingPage from 'app/components/meetings/meeting-page';
import TeacherPage from 'app/components/teacher/teacher-page';

const PageByRole = {
    learner: LearnerPage,
    manager: ManagerPage,
    teacher: TeacherPage
};

export default function App() {
    const [user] = useUser();

    console.log(user);

    if (!user) return <LoadingIndicator fullscreen />;

    const HomePage = PageByRole[user.role];

    return (
        <div className="App">
            <AppHeader
                user={user}
            />

            <AppContent>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/meetings/:meetingId" component={MeetingPage} />
                </Switch>
            </AppContent>

            <AppNotification />
        </div>
    );
}