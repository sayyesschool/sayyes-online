import { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from 'shared/components/app-header';
import AppBar from 'shared/components/app-bar';
import AppContent from 'shared/components/app-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import NotificationAlert from 'shared/components/notification-alert';
// import SearchForm from 'shared/components/search-form';

import UI from 'app/contexts/ui';
import { useStore, useActions } from 'app/hooks/store';

import './App.scss';

export default function App({ routes }) {
    const [requests, requestActions] = useStore('requests.list');
    const [user, userActions] = useStore('user');
    const [notification, notificationActions] = useStore('notification');
    const managerActions = useActions('managers');
    const teacherActions = useActions('teachers');
    const courseActions = useActions('courses');
    const materialActions = useActions('materials');

    useEffect(() => {
        userActions.getUser();
        requestActions.getRequests();
        courseActions.getCourses();
        materialActions.getMaterials();
        managerActions.getManagers();
        teacherActions.getTeachers();

        //setInterval(() => requestActions.getNewRequests(), 60000);
    }, []);

    const handleAlertClose = useCallback(() => {
        notificationActions.hideNotification();
    }, []);

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <div className="App">
            <UI.Provider value={{
                showNotification: notificationActions.showNotification,
                hideNotification: notificationActions.hideNotification
            }}>
                {/* <AppHeader
                    user={user}
                /> */}

                <AppBar
                    user={user}
                    routes={routes.filter(route => !route.hidden)}
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
                    open={notification.active}
                    content={notification.text}
                    onClose={handleAlertClose}
                />
            </UI.Provider>
        </div>
    );
}