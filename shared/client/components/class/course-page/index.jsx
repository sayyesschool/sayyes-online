import React from 'react';
import { Link } from 'react-router-dom';

import { useEnrollment } from 'shared/hooks/enrollment';
import { useCourse } from 'shared/hooks/course';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CourseContent from 'shared/components/class/course-content';

import './index.scss';

export default function CoursePage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [course] = useCourse(match.params.courseId);

    if (!course) return <LoadingIndicator />;

    course.url = `/class/${enrollment.id}/course/${course.id}`;

    // const segments = [course, unit, lesson].filter(item => !!item);
    // const [title] = segments.slice(-1).map(item => item.title);
    // const breadcrumbs = segments
    //     .slice(0, -1)
    //     .map(item => <Link to={item.url}>{item.title}</Link>);

    return (
        <Page id="course-page">
            <PageHeader
                title={course.title}
            />

            <PageContent>
                <CourseContent
                    course={course}
                />
            </PageContent>
        </Page>
    );
}