import { Route, Switch } from 'react-router-dom';

import MembershipsPage from './memberships-page';

export default function Memberships() {
    return (
        <Switch>
            <Route path="/memberships/:id?" component={MembershipsPage} />
        </Switch>
    );
}