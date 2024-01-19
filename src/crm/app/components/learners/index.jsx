import { Switch, Route } from 'react-router-dom';

import Learner from './learner-page';
import Learners from './learners-page';
import Enrollment from '../enrollments/enrollment-page';

export default function LearnersRouter() {
    return (
        <Switch>
            <Route exact path="/learners" component={Learners} />
            <Route exact path="/learners/:id" component={Learner} />
            <Route path="/learners/:learnerId/enrollments/:enrollmentId" component={Enrollment} />
        </Switch>
    );
}