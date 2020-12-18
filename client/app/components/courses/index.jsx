import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from './course-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="*/courses/:courseId" component={Course} />
            <Route path="*/courses/:courseId/units/:unitId" component={Course} />
        </Switch>
    );
}