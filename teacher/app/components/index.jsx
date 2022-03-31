import { Fragment, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { getUser } from 'shared/store/modules/user';
import { getEnrollments } from 'shared/store/modules/enrollments';
import { getCourses } from 'shared/store/modules/courses';
import { getMaterials } from 'shared/store/modules/materials';
import { hideNotification } from 'shared/store/modules/notification';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import NotificationAlert from 'shared/components/notification-alert';
//import NavBar from 'shared/components/nav-bar';

// import navItems from 'app/data/nav';
import Account from 'app/components/account';
// import Courses from 'app/components/courses';
import Home from 'app/components/home';
// import Enrollments from 'app/components/enrollments';
// import Materials from 'app/components/materials';
// import Post from 'app/components/post';

import './index.scss';

const actionsToBind = {
    getUser,
    getEnrollments,
    getCourses,
    getMaterials,
    hideNotification
};

export default function App() {
    const [{ user, notification }, actions] = useStore(
        state => ({
            user: state.user,
            notification: state.notification,
        }),
        actionsToBind
    );

    useEffect(() => {
        actions.getUser();
        actions.getEnrollments();
        actions.getCourses();
        actions.getMaterials();
    }, []);

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    if (!user) return <LoadingIndicator />;

    return (
        <Fragment>
            <AppHeader
                user={user}
            >
                {/* <NavBar items={navItems} /> */}
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    {/* <Route path="/courses" component={Courses} />
                    <Route path="/enrollments" component={Enrollments} />
                    <Route path="/materials" component={Materials} />
                    <Route path="/posts/:id" component={Post} /> */}
                </Switch>
            </AppContent>

            <NotificationAlert
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </Fragment>
    );
}