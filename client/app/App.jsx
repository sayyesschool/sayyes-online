import React, { useEffect, useCallback, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dialog, SideSheet } from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { hideNotification } from 'shared/store/actions/notification';
import NotificationSnackbar from 'shared/components/notification-snackbar';
import LoadingIndicator from 'shared/components/loading-indicator';
import NavBar from 'shared/components/nav-bar';
import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';

import { getUser } from 'app/store/modules/user';
import { getEnrollments } from 'app/store/modules/enrollments';
import PaymentBanner from 'app/components/shared/payment-banner';
import PaymentForm from 'app/components/shared/payment-form';
import Account from 'app/components/account';
import Home from 'app/components/home';
import Class from 'app/components/class';
import navItems from 'app/data/nav';

import './App.scss';

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
                onNotificationIconClick={() => setSideSheetOpen(true)}
            >
                <NavBar items={navItems} />
            </AppHeader>

            <AppContent>
                <PaymentBanner onActionClick={() => setDialogOpen(true)} />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/account" component={Account} />
                    <Route path="/class/:id?" component={Class} />
                </Switch>
            </AppContent>

            <Dialog
                className="payment-dialog"
                open={isDialogOpen}
                title="Оплата обучения"
                onClose={() => setDialogOpen(false)}
            >
                <PaymentForm />
            </Dialog>

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