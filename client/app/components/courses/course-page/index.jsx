import React from 'react';
import { Link } from 'react-router-dom';

import { useEnrollment } from 'shared/hooks/enrollments';
import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CourseContent from 'shared/components/course-content';

import CourseDetails from 'app/components/courses/course-details';

import './index.scss';

export default function CoursePage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [course] = useCourse(match.params.courseId);

    if (!enrollment || !course) return <LoadingIndicator />;

    return (
        <Page id="course-page">
            <PageHeader
                title={course.title}
                breadcrumbs={[
                    <Link to={enrollment.url}>{enrollment.title}</Link>
                ]}
                pullContent
            />

            <PageContent>
                <CourseContent
                    enrollment={enrollment}
                    course={course}
                />
            </PageContent>
        </Page>
    );
}