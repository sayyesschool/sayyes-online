import React, { useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { actions as notificationActions } from 'shared/store/actions/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';

import UI from 'app/contexts/ui';

import AppHeader from './components/shared/app-header';
import AppSidenav from './components/shared/app-sidenav';
import AppContent from './components/shared/app-content';
import Home from './pages/home';
// import Lessons from './pages/lessons';
// import Lesson from './pages/lesson';
// import Payments from './pages/payments';
import Requests from './pages/requests';

import './App.scss';

export default function App() {
    const [notification, actions] = useStore(
        state => state.notification,
        notificationActions
    );

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    return (
        <UI.Provider value={{
            showNotification: actions.showNotification,
            hideNotification: actions.hideNotification
        }}>
            <AppHeader />

            <AppSidenav />

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/lessons" component={Lessons} /> */}
                    <Route path="/requests" component={Requests} />
                    {/* <Route path="/lesson/:lessonId" component={Lesson} />
                    <Route path="/payments" component={Payments} /> */}
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