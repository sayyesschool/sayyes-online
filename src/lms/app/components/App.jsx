import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';
import { useUser } from 'shared/hooks/user';

import Assignments from 'lms/components/assignments';
import Courses from 'lms/components/courses';
import Enrollments from 'lms/components/enrollments';
import { LearnerHomePage, TeacherHomePage } from 'lms/components/home';
import navItems from 'lms/data/nav';

const PageHomeByRole = {
    learner: LearnerHomePage,
    teacher: TeacherHomePage
};

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <div className="App">
            <AppHeader user={user}>
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route path="/" component={PageHomeByRole[user.role]} exact />
                    <Route path="/assignments" component={Assignments} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/enrollments" component={Enrollments} />
                    {/* <Route path="/materials" component={Materials} /> */}
                </Switch>
            </AppContent>

            <AppNotification />
        </div >
    );
}