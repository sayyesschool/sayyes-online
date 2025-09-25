import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useCourse } from 'shared/hooks/courses';

import UnitContent from 'lms/components/courses/unit-content';

export default function UnitPage({ match, location }) {
    const [course] = useCourse(match.params.course, location.search);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unit);
    const query = course.enrollmentId ? `?enrollmentId=${course.enrollmentId}` : '';

    return (
        <Page className="UnitPage">
            <Page.Header
                title={unit.title}
                breadcrumbs={[
                    { to: `/enrollments/${course.enrollmentId}`, content: 'Обучение' },
                    { to: course.uri + query, content: course.title }
                ]}
            />

            <Page.Content>
                <UnitContent
                    course={course}
                    unit={unit}
                />
            </Page.Content>
        </Page>
    );
}