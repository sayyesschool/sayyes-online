import { Route, Switch } from 'react-router-dom';

import RequestsPage from './requests-page';

export default function RequestsRouter() {
    return (
        <Switch>
            <Route
                path="/requests/:id?"
                component={RequestsPage}
                exact
            />
        </Switch>
    );
}