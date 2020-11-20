import React, { useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/modules/notification';
import { getEnrollments } from 'shared/store/modules/enrollments';
import { getUser } from 'shared/store/modules/user';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import LoadingIndicator from 'shared/components/loading-indicator';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import NavBar from 'shared/components/nav-bar';
import Class from 'shared/components/class';

import navItems from 'app/data/nav';
import Account from './components/account';
import Home from './components/home';
import Students from './components/students';

import './App.scss';

export default function App() {
    const [{ user, notification }, actions] = useStore(
        state => ({
            user: state.user,
            notification: state.notification,
        }),
        { hideNotification, getUser, getEnrollments }
    );

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
                onNotificationIconClick={() => setSideSheetOpen(true)}
            >
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route path="/students" component={Students} />
                    <Route path="/class/:id?" component={Class} />
                </Switch>
            </AppContent>

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </React.Fragment>
    );
}