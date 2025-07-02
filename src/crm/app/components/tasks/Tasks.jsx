import { Route, Switch } from 'react-router-dom';

import TaskPage from './task-page';
import TasksPage from './tasks-page';

export default function Tasks() {
    return (
        <Switch>
            <Route
                path="/tasks"
                component={TasksPage}
                exact
            />

            <Route
                path="/tasks/:taskId"
                component={TaskPage}
                exact
            />
        </Switch>
    );
}