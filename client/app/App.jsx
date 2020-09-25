import React, { useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/actions/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import LoadingIndicator from 'shared/components/loading-indicator';

import { getAccount } from 'app/store/modules/account';
import { getEnrollments } from 'app/store/modules/enrollments';

import AppHeader from './components/shared/app-header';
import AppContent from './components/shared/app-content';
import Account from './components/account';
import Home from './components/home';
import Class from './components/class';

import './App.scss';

export default function App() {
    const [{ account, notification }, actions] = useStore(
        state => ({
            account: state.account,
            notification: state.notification,
        }),
        { hideNotification, getAccount, getEnrollments }
    );

    useEffect(() => {
        actions.getAccount();
        actions.getEnrollments();
    }, []);

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    if (!account) return <LoadingIndicator />;

    return (
        <React.Fragment>
            <AppHeader />

            <AppContent>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route path="/class" component={Class} />
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