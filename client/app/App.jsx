import React, { useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/actions/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import LoadingIndicator from 'shared/components/loading-indicator';

import { getAccount } from 'app/store/modules/account';
import { getLessons } from 'app/store/modules/lessons';
import { getPayments } from 'app/store/modules/payments';

import Header from './components/shared/header';
import Account from './components/account';
import Home from './components/home';
import Lesson from './components/lessons/lesson-page';

import './App.scss';

export default function App() {
    const [{ account, notification }, actions] = useStore(
        state => ({
            account: state.account,
            notification: state.notification,
        }),
        { hideNotification, getAccount, getLessons, getPayments }
    );

    useEffect(() => {
        actions.getAccount();
        actions.getLessons();
        actions.getPayments();
    }, []);

    const handleSnackbarClose = useCallback(() => {
        actions.hideNotification();
    }, []);

    if (!account) return <LoadingIndicator />;

    return (
        <React.Fragment>
            <Header />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/account" component={Account} />
                <Route path="/lessons/:lessonId" component={Lesson} />
            </Switch>

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </React.Fragment>
    );
}