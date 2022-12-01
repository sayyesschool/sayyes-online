import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import UnitContent from 'shared/components/unit-content';

import './index.scss';

export default function UnitPage({ match }) {
    const [course] = useCourse(match.params.course);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unit);

    return (
        <Page className="unit-page">
            <Page.Header
                title={unit.title}
                breadcrumbs={[
                    { url: course.url, text: course.title }
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