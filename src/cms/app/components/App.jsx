import { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import NotificationAlert from 'shared/components/notification-alert';

import { useStore, useActions } from 'app/store';
import UI from 'app/contexts/ui';

import './App.scss';

export default function App({ routes }) {
    const [user, userActions] = useStore('user');
    const [notification, notificationActions] = useStore('notification');
    const courseActions = useActions('courses');
    const materialActions = useActions('materials');

    useEffect(() => {
        userActions.getUser();
        courseActions.getCourses();
        materialActions.getMaterials();
    }, []);

    const handleAlertClose = useCallback(() => {
        notificationActions.hideNotification();
    }, []);

    if (!user) return <LoadingIndicator fluid />;

    return (
        <div className="App">
            <UI.Provider value={{
                showNotification: notificationActions.showNotification,
                hideNotification: notificationActions.hideNotification
            }}>
                <AppHeader
                    user={user}
                />

                <AppContent>
                    <Switch>
                        {routes.map(route =>
                            <Route
                                key={route.path}
                                {...route}
                            />
                        )}
                    </Switch>
                </AppContent>

                <NotificationAlert
                    type={notification.type}
                    open={notification.open}
                    content={notification.text}
                    onClose={handleAlertClose}
                />
            </UI.Provider>
        </div>
    );
}