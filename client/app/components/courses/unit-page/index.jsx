import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import CourseContents from 'shared/components/course-contents';
import UnitContent from 'shared/components/unit-content';

import './index.scss';

export default function UnitPage({ match }) {
    const [course] = useCourse(match.params.course);

    const rootRef = useRef();

    const [isSideSheetOpen, setSideSheetOpen] = useState(false);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsBySlug.get(match.params.unit);

    return (
        <>
            <PageSideSheet
                title="Содержание"
                open={isSideSheetOpen}
                onClose={() => setSideSheetOpen(false)}
            >
                <CourseContents
                    course={course}
                    unit={unit}
                />
            </PageSideSheet>

            <Page ref={rootRef} className="unit-page">
                <PageHeader
                    title={unit.title}
                    breadcrumbs={[
                        <Link to={course.url}>{course.title}</Link>
                    ]}
                    actions={[
                        <IconButton
                            icon="format_list_bulleted"
                            onClick={() => setSideSheetOpen(true)}
                        />
                    ]}
                    pullContent
                />

                <PageContent>
                    <UnitContent
                        course={course}
                        unit={unit}
                    />
                </PageContent>
            </Page>
        </>
    );
}