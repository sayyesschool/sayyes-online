import { Route, Switch } from 'react-router-dom';

import Enrollment from '../enrollments/enrollment-page';

import Learner from './learner-page';
import Learners from './learners-page';

export default function LearnersRouter() {
    return (
        <Switch>
            <Route
                path="/learners" component={Learners}
                exact
            />

            <Route
                path="/learners/:id" component={Learner}
                exact
            />

            <Route path="/learners/:learnerId/enrollments/:enrollmentId" component={Enrollment} />
        </Switch>
    );
}