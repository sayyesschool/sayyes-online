import React, { useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { showNotification, hideNotification } from 'shared/actions/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';

import { getUsers } from 'app/store/modules/users';
import UI from 'app/contexts/ui';

import Header from './components/shared/header';
import Drawer from './components/shared/drawer';
import Home from './pages/home';
import Lessons from './pages/lessons';
import Lesson from './pages/lesson';
import Payments from './pages/payments';
import Users from './pages/users';

import './App.scss';

export default function App() {
    const [notification, actions] = useStore(
        state => state.notification,
        { showNotification, hideNotification, getUsers }
    );

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    return (
        <UI.Provider value={{
            showNotification: actions.showNotification,
            hideNotification: actions.hideNotification
        }}>
            <Header />

            <Drawer />

            <div id="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/lessons" component={Lessons} />
                    <Route path="/lesson/:lessonId" component={Lesson} />
                    <Route path="/payments" component={Payments} />
                    <Route path="/users" component={Users} />
                </Switch>
            </div>

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </UI.Provider>
    );
}