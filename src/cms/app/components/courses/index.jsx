import { Switch, Route } from 'react-router-dom';

import CoursePage from './course-page';
import CoursesPage from './courses-page';
import ExercisePage from './exercise-page';
import LessonPage from './lesson-page';
import SectionPage from './section-page';
import UnitPage from './unit-page';

export default function CourseRouter() {
    return (
        <Switch>
            <Route exact path="/courses" component={CoursesPage} />
            <Route exact path="/courses/:courseId" component={CoursePage} />
            <Route exact path="/courses/:courseId/units/:unitId" component={UnitPage} />
            <Route exact path="/courses/:courseId/lessons/:lessonId" component={LessonPage} />
            <Route exact path="/courses/:courseId/sections/:sectionId" component={SectionPage} />
            <Route exact path="/courses/:courseId/exercises/:exerciseId" component={ExercisePage} />
        </Switch>
    );
}