import { Route, Switch } from 'react-router-dom';

import ManagerPage from './manager-page';
import ManagersPage from './managers-page';

export default function Managers() {
    return (
        <Switch>
            <Route
                path="/managers"
                component={ManagersPage}
                exact
            />

            <Route
                path="/managers/:id"
                component={ManagerPage}
                exact
            />
        </Switch>
    );
}