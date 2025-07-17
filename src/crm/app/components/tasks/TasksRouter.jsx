import { Route, Switch } from 'react-router-dom';

import TasksPage from './tasks-page';

export default function TasksRouter() {
    return (
        <Switch>
            <Route
                path="/tasks"
                component={TasksPage}
                exact
            />
        </Switch>
    );
}