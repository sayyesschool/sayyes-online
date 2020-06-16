import React, { useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import { hideNotification } from 'shared/actions/notification';

import { getAccount } from 'app/store/modules/account';
import { getLessons } from 'app/store/modules/lessons';
import { getPayments } from 'app/store/modules/payments';

import Header from './components/header';
import Account from './pages/account';
import Home from './pages/home';
import Lesson from './pages/lesson';

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

    return (
        <React.Fragment>
            <Header />

            {!account ?
                <Spinner />
                :
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    {/* <Route path="/payments" component={Account} /> */}
                    <Route path="/lessons/:lessonId" component={Lesson} />
                </Switch>
            }

            <NotificationSnackbar
                open={notification.active}
                type={notification.type}
                text={notification.text}
                onClose={handleSnackbarClose}
            />
        </React.Fragment>
    );
}