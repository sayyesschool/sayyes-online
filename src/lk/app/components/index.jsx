import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';
import { useUser } from 'shared/hooks/user';

import Courses from 'lk/components/courses';
import Enrollments from 'lk/components/enrollments';
import Home from 'lk/components/home';
// import Meetings from 'lk/components/meetings';
// import Posts from 'lk/components/posts';
import navItems from 'lk/data/nav';


import './index.scss';

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
                    <Route exact path="/" component={Home} />
                    {/* <Route path="/account" component={Account} /> */}
                    <Route path="/courses" component={Courses} />
                    <Route path="/enrollments" component={Enrollments} />
                    {/* <Route path="/materials" component={Materials} /> */}
                    {/* <Route path="/meetings" component={Meetings} /> */}
                </Switch>
            </AppContent>

            {/* <AppAlert /> */}
        </div>
    );
}