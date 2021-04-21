import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from 'shared/components/app-header';
import AppDrawer from 'shared/components/app-drawer';
import AppContent from 'shared/components/app-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import NotificationSnackbar from 'shared/components/notification-snackbar';

import navItems from 'app/data/nav';
import UI from 'app/contexts/ui';
import { useStore, useActions } from 'app/hooks/store';
import NavList from 'app/components/shared/nav-list';
import Search from 'app/components/shared/search';
import Home from 'app/components/home';
import Clients from 'app/components/clients';
import Courses from 'app/components/courses';
import Lessons from 'app/components/lessons';
import Managers from 'app/components/managers';
import Materials from 'app/components/materials';
import Meetings from 'app/components/meetings';
import Packs from 'app/components/packs';
import Payments from 'app/components/payments';
import Requests from 'app/components/requests';
import Teachers from 'app/components/teachers';
import Tickets from 'app/components/tickets';

import './App.scss';

export default function App() {
    const [requests, requestActions] = useStore('requests.list');
    const [user, userActions] = useStore('user');
    const [notification, notificationActions] = useStore('notification');
    const managerActions = useActions('managers');
    const teacherActions = useActions('teachers');
    const courseActions = useActions('courses');
    const materialActions = useActions('materials');

    const [isSidenavOpen, setSidenavOpen] = useState(true);

    useEffect(() => {
        userActions.getUser();
        requestActions.getRequests();
        courseActions.getCourses();
        materialActions.getMaterials();
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
                navigationIcon="menu"
                onNavigationIconClick={() => setSidenavOpen(open => !open)}
                fixed
            >
                <Search />
            </AppHeader>

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
                    <Route path="/materials" component={Materials} />
                    <Route path="/managers" component={Managers} />
                    <Route path="/meetings" component={Meetings} />
                    <Route path="/packs" component={Packs} />
                    <Route path="/payments" component={Payments} />
                    <Route path="/requests" component={Requests} />
                    <Route path="/teachers" component={Teachers} />
                    <Route path="/tickets" component={Tickets} />
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