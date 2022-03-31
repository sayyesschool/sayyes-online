import { Switch, Route } from 'react-router-dom';

import CoursesPage from './courses-page';
import CoursePage from './course-page';
import UnitPage from './unit-page';
import LessonPage from './lesson-page';
import ExercisePage from './exercise-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses" component={CoursesPage} />
            <Route exact path="/courses/:courseId" component={CoursePage} />
            <Route exact path="/courses/:courseId/units/:unitId" component={UnitPage} />
            <Route exact path="/courses/:courseId/units/:unitId/lessons/:lessonId" component={LessonPage} />
            <Route path="/courses/:courseId/units/:unitId/lessons/:lessonId/exercises/:exerciseId" component={ExercisePage} />
        </Switch>
    );
}