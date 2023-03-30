import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import UnitContent from 'shared/components/unit-content';

import './index.scss';

export default function UnitPage({ match, location }) {
    const [course] = useCourse(match.params.course, location.search);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unit);

    return (
        <Page className="UnitPage">
            <Page.Header
                title={unit.title}
                breadcrumbs={[
                    { to: course.uri, content: course.title }
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