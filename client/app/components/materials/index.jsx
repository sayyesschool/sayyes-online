import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Material from './material-page';

export default function MaterialRouter() {
    return (
        <Switch>
            <Route exact path="/enrollments/:id/materials/:slug" component={Material} />
        </Switch>
    );
}