import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import {
    Typography
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useEnrollment } from 'app/hooks/enrollment';
import { useCourse } from 'app/hooks/course';
import CourseContent from 'app/components/class/course-content';
import UnitContent from 'app/components/class/unit-content';
import LessonContent from 'app/components/class/lesson-content';

import './index.scss';

export default function CoursePage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [course] = useCourse(match.params.courseId);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);
    const lesson = course.lessonsById.get(match.params.lessonId);

    course.url = `/class/${enrollment.id}/course/${course.id}`;
    if (unit) unit.url = `${course.url}/unit/${unit.id}`;
    if (lesson) lesson.url = `${unit.url}/lesson/${lesson.id}`;

    const segments = [course, unit, lesson].filter(item => !!item);
    const [title] = segments.slice(-1).map(item => item.title);
    const breadcrumbs = segments
        .slice(0, -1)
        .map(item => <Link to={item.url}>{item.title}</Link>);

    return (
        <Page id="course-page">
            <PageHeader
                title={title}
                breadcrumbs={breadcrumbs}
            />

            <PageContent>
                <Switch>
                    <Route exact path="/class/:enrollmentId/course/:courseId">
                        <CourseContent
                            course={course}
                        />
                    </Route>

                    <Route exact path="/class/:enrollmentId/course/:courseId/unit/:unitId">
                        <UnitContent
                            course={course}
                            unit={unit}
                        />
                    </Route>

                    <Route exact path="/class/:enrollmentId/course/:courseId/unit/:unitId/lesson/:lessonId">
                        <LessonContent
                            course={course}
                            unit={unit}
                            lesson={lesson}
                        />
                    </Route>
                </Switch>
            </PageContent>
        </Page>
    );
}

const sideSheetTitles = {
    contents: 'Содержание',
    audio: 'Аудио',
    video: 'Видeо'
};