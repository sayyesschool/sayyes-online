import { Switch, Route } from 'react-router-dom';

import Materials from './materials-page';
import Material from './material-page';

export default function MeetingRouter() {
    return (
        <Switch>
            <Route exact path="/materials" component={Materials} />
            <Route exact path="/materials/:id" component={Material} />
        </Switch>
    );
}