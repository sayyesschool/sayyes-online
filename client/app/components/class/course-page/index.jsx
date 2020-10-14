import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

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

    const unit = course.units?.find(unit => unit.id === match.params.unitId);
    const lesson = unit?.lessons.find(lesson => lesson.id === match.params.lessonId);

    course.url = `/class/${enrollment.id}/course/${course.id}`;
    if (unit) unit.url = `${course.url}/unit/${unit.id}`;
    if (lesson) lesson.url = `${unit.url}/lesson/${lesson.id}`;

    const title = [course, unit, lesson]
        .filter(item => !!item)
        .map(item => <Link to={item.url}>{item.title} › </Link>);

    return (
        <Page id="course-page">
            <PageHeader
                title={title}
            />

            <PageContent>
                <Switch>
                    <Route exact path="/class/:enrollmentId/course/:courseId">
                        <CourseContent
                            enrollment={enrollment}
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