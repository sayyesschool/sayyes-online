import { Route, Switch } from 'react-router-dom';

import Memberships from './memberships-page';

export default function MembershipsRouter() {
    return (
        <Switch>
            <Route path="/memberships/:id?" component={Memberships} />
        </Switch>
    );
}