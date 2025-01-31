import { Route, Switch } from 'react-router-dom';

import EnrollmentPage from './enrollment-page';

export default function Enrollments() {
    return (
        <Switch>
            <Route path="/enrollments/:enrollmentId" component={EnrollmentPage} />
        </Switch>
    );
}