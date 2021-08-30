import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Courses from './courses-page';
import Course from './course-page';
import Unit from './unit-page';
import Lesson from './lesson-page';
import Exercise from './exercise-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:courseId" component={Course} />
            <Route exact path="/courses/:courseId/units/:unitId" component={Unit} />
            <Route exact path="/courses/:courseId/units/:unitId/lessons/:lessonId" component={Lesson} />
            <Route path="/courses/:courseId/units/:unitId/lessons/:lessonId/exercises/:exerciseId" component={Exercise} />
        </Switch>
    );
}