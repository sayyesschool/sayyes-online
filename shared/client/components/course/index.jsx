import React from 'react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import CourseContent from 'shared/components/course-content';

import './index.scss';

export default function Course({ match }) {
    const [course] = useCourse(match.params.courseId);

    if (!course) return <LoadingIndicator />;

    return (
        <div id="course">
            <CourseContent
                course={course}
            />
        </div>
    );
}