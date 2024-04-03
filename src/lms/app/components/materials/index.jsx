import { Route, Switch } from 'react-router-dom';

import Material from 'shared/components/material-page';

export default function MaterialRouter() {
    return (
        <Switch>
            <Route path="/enrollments/:id/materials/:slug" component={Material} exact />
        </Switch>
    );
}