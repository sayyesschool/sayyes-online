import React, { useEffect, useCallback, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SideSheet } from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { getUser } from 'shared/store/modules/user';
import { getEnrollments } from 'shared/store/modules/enrollments';
import { hideNotification } from 'shared/store/modules/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';

import navItems from 'app/data/nav';
import Account from 'app/components/account';
import Home from 'app/components/home';
import Assignments from 'app/components/assignments';
import Enrollments from 'app/components/enrollments';
import Courses from 'app/components/courses';
import Materials from 'app/components/materials';
import Meetings from 'app/components/meetings';
import Posts from 'app/components/posts';

import './index.scss';

export default function App() {
    const [{ user, notification }, actions] = useStore(
        state => ({
            user: state.user,
            notification: state.notification,
        }),
        { hideNotification, getUser, getEnrollments }
    );
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isSideSheetOpen, setSideSheetOpen] = useState(false);

    useEffect(() => {
        actions.getUser();
        actions.getEnrollments();
    }, []);

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    if (!user) return <LoadingIndicator />;

    return (
        <React.Fragment>
            <AppHeader
                user={user}
            >
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent fixedAdjust>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route path="/enrollments/:id/assignments" component={Assignments} />
                    <Route path="*/courses" component={Courses} />
                    <Route path="/enrollments/:id/materials" component={Materials} />
                    <Route path="/enrollments/:id/posts" component={Posts} />
                    <Route path="/enrollments" component={Enrollments} />
                    <Route path="/meetings" component={Meetings} />
                </Switch>
            </AppContent>

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />

            <SideSheet
                title="Уведомления"
                open={isSideSheetOpen}
                modal
                onClose={() => setSideSheetOpen(false)}
            >

            </SideSheet>
        </React.Fragment>
    );
}