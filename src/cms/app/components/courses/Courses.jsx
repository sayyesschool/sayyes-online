import { Route, Switch } from 'react-router-dom';

import CoursePage from './course-page';
import CoursesPage from './courses-page';
import ExercisePage from './exercise-page';
import LessonPage from './lesson-page';
import SectionPage from './section-page';
import UnitPage from './unit-page';

export default function Courses() {
    return (
        <Switch>
            <Route
                path="/courses"
                component={CoursesPage}
                exact
            />

            <Route
                path="/courses/:courseId"
                component={CoursePage}
                exact
            />

            <Route
                path="/courses/:courseId/units/:unitId"
                component={UnitPage}
                exact
            />

            <Route
                path="/courses/:courseId/lessons/:lessonId"
                component={LessonPage}
                exact
            />

            <Route
                path="/courses/:courseId/sections/:sectionId"
                component={SectionPage}
                exact
            />

            <Route
                path="/courses/:courseId/exercises/:exerciseId"
                component={ExercisePage}
                exact
            />
        </Switch>
    );
}