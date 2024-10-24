import { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from 'shared/components/app-bar';
import AppContent from 'shared/components/app-content';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';

// import SearchForm from 'shared/components/search-form';
import UI from 'crm/contexts/ui';
import { useActions, useStore } from 'crm/hooks/store';

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
            }}
            >
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

                <AppNotification
                    type={notification.type}
                    open={notification.active}
                    content={notification.text}
                    onClose={handleAlertClose}
                />
            </UI.Provider>
        </div>
    );
}