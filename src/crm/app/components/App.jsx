import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBar from 'shared/components/app-bar';
import AppContent from 'shared/components/app-content';
import AppShell from 'shared/components/app-shell';
import LoadingIndicator from 'shared/components/loading-indicator';
import { useRequests } from 'shared/store/requests';

// import SearchForm from 'shared/components/search-form';
import { useActions, useStore } from 'crm/hooks/store';

import styles from './App.module.scss';

export default function App({ routes }) {
    const [user, { getUser }] = useStore('user');
    const { getLessons } = useActions('lessons');
    const { getCourses } = useActions('courses');
    const { getMaterials } = useActions('materials');
    const { getMeetings } = useActions('meetings');
    const { getManagers } = useActions('managers');
    const { getTeachers } = useActions('teachers');

    useRequests();

    useEffect(() => {
        getUser();
        getLessons();
        getMeetings();
        getCourses();
        getMaterials();
        getManagers();
        getTeachers();

        //setInterval(() => requestActions.getNewRequests(), 60000);
    }, [
        getUser,
        getLessons,
        getCourses,
        getMaterials,
        getMeetings,
        getManagers,
        getTeachers
    ]);

    if (!user) return <LoadingIndicator fullscreen />;

    const availableRoutes = getAvailableRoutes(user, routes);

    return (
        <AppShell className={styles.root}>
            {/* <AppHeader
                user={user}
            /> */}

            <AppBar
                user={user}
                routes={availableRoutes.filter(route => !route.hidden)}
            />

            <AppContent full>
                <Switch>
                    {availableRoutes.map(route =>
                        <Route
                            key={route.path}
                            {...route}
                        />
                    )}
                </Switch>
            </AppContent>
        </AppShell>
    );
}

function getAvailableRoutes(user, routes) {
    return routes.filter(route =>
        !route.permissions ||
        route.permissions.length === 0 ||
        !(new Set(user.permissions).isDisjointFrom(new Set(route.permissions)))
    );
}