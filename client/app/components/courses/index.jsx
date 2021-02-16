import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from './course-page';
import CourseUnit from './course-unit-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/enrollments/:enrollmentId/courses/:courseId" component={Course} />
            <Route path="/enrollments/:enrollmentId/courses/:courseId/units/:unitId" component={CourseUnit} />
        </Switch>
    );
}