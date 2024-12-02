import { Route, Switch } from 'react-router-dom';

import Tickets from './tickets-page';

export default function TicketsRouter() {
    return (
        <Switch>
            <Route path="/tickets/:id?" component={Tickets} />
        </Switch>
    );
}