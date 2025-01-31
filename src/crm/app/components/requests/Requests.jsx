import { Route, Switch } from 'react-router-dom';

import RequestsPage from './requests-page';

export default function Requests() {
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