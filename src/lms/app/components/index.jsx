import { Route, Switch } from 'react-router-dom';

import { useUser } from 'shared/hooks/user';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';

import LearnerHome from 'app/components/home/learner';
import TeacherHome from 'app/components/home/teacher';
import Enrollments from 'app/components/enrollments';
import Courses from 'app/components/courses';
import Materials from 'app/components/materials';
import navItems from 'app/data/nav';

import './index.scss';

const PageHomeByRole = {
    client: LearnerHome,
    teacher: TeacherHome
};

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <div className="App">
            <AppHeader
                user={user}
            >
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={PageHomeByRole[user.role]} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/enrollments" component={Enrollments} />
                    {/* <Route path="/materials" component={Materials} /> */}
                </Switch>
            </AppContent>

            <AppNotification />
        </div>
    );
}