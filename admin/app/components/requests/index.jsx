import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RequestsPage from './requests-page';
import RequestPage from './request-page';

export default function RequestsRouter() {
    return (
        <Switch>
            <Route exact path="/requests" component={RequestsPage} />
            <Route path="/requests/:id" component={RequestPage} />
        </Switch>
    );
}