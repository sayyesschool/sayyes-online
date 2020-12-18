import React from 'react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CourseContent from 'shared/components/course-content';

import './index.scss';

export default function CoursePage({ match }) {
    const [course] = useCourse(match.params.courseId);

    if (!course) return <LoadingIndicator />;

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