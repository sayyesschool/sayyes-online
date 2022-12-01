import { useCourse } from 'shared/hooks/courses';
import CourseContent from 'shared/components/course-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import './index.scss';

export default function CoursePage({ match }) {
    const [course] = useCourse(match.params.course);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id={course.slug} className="course-page">
            <Page.Header
                overline="Курс"
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