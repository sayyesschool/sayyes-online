import { Switch, Route } from 'react-router-dom';

import Payments from './payments-page';

export default function PaymentsRouter() {
    return (
        <Switch>
            <Route path="/payments/:id?" component={Payments} />
        </Switch>
    );
}