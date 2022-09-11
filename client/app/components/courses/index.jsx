import { Route, Switch } from 'react-router-dom';

import Course from './course-page';
import Unit from './unit-page';
import Lesson from './lesson-page';
import Exercise from './exercise-page';

import './index.scss';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses/:course" component={Course} />
            <Route exact path="/courses/:course/units/:unit" component={Unit} />
            <Route exact path="/courses/:course/lessons/:lesson" component={Lesson} />
            <Route exact path="/courses/:course/exercises/:exercise" component={Exercise} />
        </Switch>
    );
}