import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Courses from './courses-page';
import Course from 'shared/components/course-page';
import Unit from 'shared/components/unit-page';

export default function CourseRouter() {
    return (
        <Switch>
            {/* <Route exact path="/courses" component={Courses} /> */}
            <Route exact path="/courses/:courseId" component={Course} />
            <Route exact path="/courses/:courseId/units/:unitId" component={Unit} />
        </Switch>
    );
}