import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import CourseContent from 'app/components/courses/course-content';

export default function CoursePage({ match, location }) {
    const [course] = useCourse(match.params.course, location.search);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id={course.slug} className="CoursePage">
            <Page.Header
                breadcrumbs={[{ content: 'Курс' }]}
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