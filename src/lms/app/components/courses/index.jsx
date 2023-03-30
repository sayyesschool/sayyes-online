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
            <Route exact path="/courses/:courseId/lessons/:lessonId" component={LessonPage} />
            <Route exact path="/courses/:courseId/exercises/:exerciseId" component={ExercisePage} />
            <Route path="/courses/:courseId/exercises/:exerciseId/items/:itemId" component={ExercisePage} />
        </Switch>
    );
}