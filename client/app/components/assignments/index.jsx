import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Assignment from './assignment-page';

export default function AssignmentRouter() {
    return (
        <Switch>
            <Route exact path="/enrollments/:enrollmentId/assignments/:assignmentId" component={Assignment} />
        </Switch>
    );
}