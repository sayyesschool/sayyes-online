import { Switch, Route } from 'react-router-dom';

import Enrollment from './enrollment-page';

export default function EnrollmentsRouter() {
    return (
        <Switch>
            <Route path="/enrollments/:enrollmentId" component={Enrollment} />
        </Switch>
    );
}