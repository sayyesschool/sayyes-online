import { Switch, Route } from 'react-router-dom';

import Clients from './clients-page';
import Client from './client-page';
// import Enrollment from '../enrollments/enrollment-page';

export default function ClientsRouter() {
    return (
        <Switch>
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/clients/:id" component={Client} />
            {/* <Route path="/clients/:clientId/enrollments/:enrollmentId" component={Enrollment} /> */}
        </Switch>
    );
}