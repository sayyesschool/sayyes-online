import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppContent from 'shared/components/app-content';
import AppHeader from 'shared/components/app-header';
import AppNotification from 'shared/components/app-notification';
import LoadingIndicator from 'shared/components/loading-indicator';

import UI from 'cms/contexts/ui';
import { useActions, useStore } from 'cms/store';

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