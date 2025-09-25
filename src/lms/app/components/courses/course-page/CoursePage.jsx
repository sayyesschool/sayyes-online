import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useCourse } from 'shared/hooks/courses';

import CourseContent from 'lms/components/courses/course-content';

export default function CoursePage({ match, location }) {
    const [course] = useCourse(match.params.course, location.search);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id={course.slug} className="CoursePage">
            <Page.Header
                breadcrumbs={[{ to: `/enrollments/${course.enrollmentId}`, content: 'Обучение' }]}
                title={course.title}
            />

            <Page.Content>
                <CourseContent
                    course={course}
                />
            </Page.Content>
        </Page>
    );
}