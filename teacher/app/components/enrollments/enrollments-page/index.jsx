import { Link } from 'react-router-dom';
import {
    LayoutGrid
} from 'mdc-react';

import { useEnrollments } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import EnrollmentCard from 'app/components/enrollments/enrollment-card';

import './index.scss';

export default function EnrollmentsPage() {
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    return (
        <Page id="enrollments">
            <PageTopBar
                title="Ученики"
            />

            <PageContent>
                <LayoutGrid>
                    {enrollments.map(enrollment =>
                        <LayoutGrid.Cell span="4">
                            <EnrollmentCard
                                component={Link}
                                to={enrollment.url}
                                enrollment={enrollment}
                            />
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}