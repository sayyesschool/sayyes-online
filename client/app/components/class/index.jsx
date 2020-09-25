import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Enrollments from './enrollments-page';
import Enrollment from './enrollment-page';

export default function ClassRouter() {
    return (
        <Switch>
            <Route exact path="/class" component={Enrollments} />
            <Route path="/class/:id/" component={Enrollment} />
        </Switch>
    );
}