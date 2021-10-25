import { Switch, Route } from 'react-router-dom';

import Enrollment from './enrollment-page';

export default function ClientsRouter() {
    return (
        <Switch>
            <Route path="/enrollments/:enrollmentId" component={Enrollment} />
        </Switch>
    );
}