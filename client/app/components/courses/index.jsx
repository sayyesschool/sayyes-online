import { Route, Switch } from 'react-router-dom';

import Course from './course-page';
import Unit from './unit-page';
import Lesson from './lesson-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses/:course" component={Course} />
            <Route exact path="/courses/:course/units/:unit" component={Unit} />
            <Route path="/courses/:course/units/:unit/lessons/:lesson" component={Lesson} />
        </Switch>
    );
}