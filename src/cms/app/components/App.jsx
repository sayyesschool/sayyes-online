import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppHeader from 'shared/components/app-header';
import AppContent from 'shared/components/app-content';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';

import { useStore, useActions } from 'app/store';
import UI from 'app/contexts/ui';

import './App.scss';

export default function App({ routes }) {
    const [user, userActions] = useStore('user');
    const courseActions = useActions('courses');
    const materialActions = useActions('materials');

    useEffect(() => {
        userActions.getUser();
        courseActions.getCourses();
        materialActions.getMaterials();
    }, []);


    if (!user) return <LoadingIndicator fluid />;

    return (
        <div className="App">
            <UI.Provider value={{}}>
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

                <AppNotification />
            </UI.Provider>
        </div>
    );
}