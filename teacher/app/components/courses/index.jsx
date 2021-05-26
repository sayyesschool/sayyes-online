import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Course from './course-page';
import Courses from './courses-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses" component={Courses} />
            <Route
                path={[
                    '/courses/:courseId/units/:unitId/lessons/:lessonId',
                    '/courses/:courseId/units/:unitId',
                    '/courses/:courseId'
                ]}
                component={Course}
            />
        </Switch>
    );
}