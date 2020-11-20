import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Tickets from './tickets-page';

export default function TicketRouter() {
    return (
        <Switch>
            <Route exact path="/tickets" component={Tickets} />
        </Switch>
    );
}