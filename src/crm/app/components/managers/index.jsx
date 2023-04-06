import { Switch, Route } from 'react-router-dom';

import Managers from './managers-page';
import Manager from './manager-page';

export default function ManagersRouter() {
    return (
        <Switch>
            <Route exact path="/managers" component={Managers} />
            <Route exact path="/managers/:id" component={Manager} />
        </Switch>
    );
}