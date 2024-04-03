import { Route, Switch } from 'react-router-dom';

import AssignmentPage from './assignment-page';

export default function AssignmentsRouter() {
    return (
        <Switch>
            <Route path="/assignments/:id" component={AssignmentPage} exact />
        </Switch>
    );
}