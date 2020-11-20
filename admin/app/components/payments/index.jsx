import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Payments from './payments-page';

export default function ClientsRouter() {
    return (
        <Switch>
            <Route path="/payments/:id?" component={Payments} />
        </Switch>
    );
}