import { Switch, Route } from 'react-router-dom';

import RequestsPage from './requests-page';

export default function RequestsRouter() {
    return (
        <Switch>
            <Route exact path="/requests/:id?" component={RequestsPage} />
        </Switch>
    );
}