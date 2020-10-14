import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from 'shared/components/app-header';
import AppDrawer from 'shared/components/app-drawer';
import AppContent from 'shared/components/app-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import NotificationSnackbar from 'shared/components/notification-snackbar';

import { useStore, useActions } from 'app/store';
import UI from 'app/contexts/ui';
import NavList from 'app/components/shared/nav-list';
import navItems from 'app/data/nav';

import Home from './components/home';
import Clients from './components/clients';
import Courses from './components/courses';
import Lessons from './components/lessons';
import Payments from './components/payments';
import Requests from './components/requests';

import './App.scss';

export default function App() {
    const [requests, requestActions] = useStore('requests.list');
    const [user, userActions] = useStore('user');
    const [notification, notificationActions] = useStore('notification');
    const managerActions = useActions('managers');
    const teacherActions = useActions('teachers');

    const [isSidenavOpen, setSidenavOpen] = useState(true);

    useEffect(() => {
        userActions.getUser();
        requestActions.getRequests();
        managerActions.getManagers();
        teacherActions.getTeachers();

        setInterval(() => requestActions.getNewRequests(), 60000);
    }, []);

    const handleSnackbarClose = useCallback(() => {
        notificationActions.hideNotification();
    }, []);

    if (!user) return <LoadingIndicator />;

    return (
        <UI.Provider value={{
            showNotification: notificationActions.showNotification,
            hideNotification: notificationActions.hideNotification
        }}>
            <AppHeader
                user={user}
                onNavigationIconClick={() => setSidenavOpen(open => !open)}
                fixed
            />

            <AppDrawer
                open={isSidenavOpen}
            >
                <NavList items={navItems} requests={requests} />
            </AppDrawer>

            <AppContent className="mdc-top-app-bar--fixed-adjust">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/lessons" component={Lessons} />
                    <Route path="/payments" component={Payments} />
                    <Route path="/requests" component={Requests} />
                </Switch>
            </AppContent>

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </UI.Provider>
    );
}