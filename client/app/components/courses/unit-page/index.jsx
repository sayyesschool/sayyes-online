import { useRef, useState } from 'react';

import { useCourse } from 'shared/hooks/courses';
import IconButton from 'shared/components/icon-button';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import UnitContent from 'shared/components/unit-content';

import './index.scss';

export default function UnitPage({ match }) {
    const [course] = useCourse(match.params.course);

    const rootRef = useRef();

    const [isSideSheetOpen, setSideSheetOpen] = useState(false);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unit);

    return (
        <Page ref={rootRef} className="unit-page">
            <Page.Header
                title={unit.title}
                breadcrumbs={[
                    { url: course.url, text: course.title }
                ]}
                actions={
                    <IconButton
                        icon="format_list_bulleted"
                        onClick={() => setSideSheetOpen(true)}
                        iconOnly
                        text
                    />
                }
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