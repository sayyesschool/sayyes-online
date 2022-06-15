import { Route, Switch } from 'react-router-dom';

import { useUser } from 'shared/hooks/user';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import AppAlert from 'shared/components/app-alert';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';

import Account from 'app/components/account';
import Home from 'app/components/home';
import Enrollments from 'app/components/enrollments';
import Courses from 'app/components/courses';
import Materials from 'app/components/materials';
// import Meetings from 'app/components/meetings';
// import Posts from 'app/components/posts';
import navItems from 'app/data/nav';


import './index.scss';

export default function App() {
    const [user] = useUser();

    if (!user) return <LoadingIndicator />;

    return (
        <div className="app">
            <AppHeader
                user={user}
            >
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route path="/account" component={Account} /> */}
                    {/* <Route path="/courses" component={Courses} /> */}
                    <Route path="/enrollments" component={Enrollments} />
                    {/* <Route path="/materials" component={Materials} /> */}
                    {/* <Route path="/meetings" component={Meetings} /> */}
                </Switch>
            </AppContent>

            <AppAlert />
        </div>
    );
}