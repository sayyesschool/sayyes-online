import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Enrollments from './enrollments-page';
import Enrollment from './enrollment-page';

export default function EnrollmentRouter() {
    return (
        <Switch>
            <Route exact path="/enrollments" component={Enrollments} />
            <Route exact path="/enrollments/:id" component={Enrollment} />
        </Switch>
    );
}