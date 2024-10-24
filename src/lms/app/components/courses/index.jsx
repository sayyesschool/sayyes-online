import { Route, Switch } from 'react-router-dom';

import Course from 'lms/components/courses/course-page';
import Courses from 'lms/components/courses/courses-page';
import Lesson from 'lms/components/courses/lesson-page';
import Unit from 'lms/components/courses/unit-page';

import './index.scss';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:course" component={Course} />
            <Route exact path="/courses/:course/units/:unit" component={Unit} />
            <Route exact path="/courses/:course/lessons/:lesson" component={Lesson} />
        </Switch>
    );
}