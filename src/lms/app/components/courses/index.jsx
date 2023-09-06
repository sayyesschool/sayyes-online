import { Route, Switch } from 'react-router-dom';

import Courses from 'app/components/courses/courses-page';
import Course from 'app/components/courses/course-page';
import Unit from 'app/components/courses/unit-page';
import Lesson from 'app/components/courses/lesson-page';

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