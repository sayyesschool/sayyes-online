import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import NotificationSnackbar from 'shared/components/notification-snackbar';

import { useStore, useActions } from 'app/store';
import UI from 'app/contexts/ui';

import AppHeader from './components/shared/app-header';
import AppSidenav from './components/shared/app-sidenav';
import AppContent from './components/shared/app-content';
import Home from './components/home';
import Clients from './components/clients';
import Payments from './components/payments';
import Requests from './components/requests';

import './App.scss';

export default function App() {
    const [isSidenavOpen, setSidenavOpen] = useState(true);
    const { getUser } = useActions('user');
    const { getManagers } = useActions('managers');
    const { getTeachers } = useActions('teachers');
    const { getRequests, getNewRequests } = useActions('requests');
    const [notification, actions] = useStore('notification');

    useEffect(() => {
        getUser();
        getManagers();
        getTeachers();
        getRequests();

        setInterval(() => getNewRequests(), 60000);
    }, []);

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    return (
        <UI.Provider value={{
            showNotification: actions.showNotification,
            hideNotification: actions.hideNotification
        }}>
            <AppHeader
                onNavigationIconClick={() => setSidenavOpen(open => !open)}
            />

            <AppSidenav
                open={isSidenavOpen}
            />

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/requests" component={Requests} />
                    <Route path="/payments" component={Payments} />
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