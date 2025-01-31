import { Route, Switch } from 'react-router-dom';

import EnrollmentPage from 'crm/components/enrollments/enrollment-page';

import LearnerPage from './learner-page';
import LearnersPage from './learners-page';

export default function Learners() {
    return (
        <Switch>
            <Route
                path="/learners"
                component={LearnersPage}
                exact
            />

            <Route
                path="/learners/:id"
                component={LearnerPage}
                exact
            />

            <Route
                path="/learners/:learnerId/enrollments/:enrollmentId"
                component={EnrollmentPage}
            />
        </Switch>
    );
}