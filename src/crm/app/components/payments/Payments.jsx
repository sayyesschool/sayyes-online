import { Route, Switch } from 'react-router-dom';

import PaymentsPage from './payments-page';

export default function Payments() {
    return (
        <Switch>
            <Route path="/payments/:id?" component={PaymentsPage} />
        </Switch>
    );
}