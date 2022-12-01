import { Link } from 'react-router-dom';

import { useEnrollments } from 'shared/hooks/enrollments';
import { Grid } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import EnrollmentCard from 'app/components/enrollments/enrollment-card';

import './index.scss';

export default function EnrollmentsPage() {
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    return (
        <Page id="enrollments">
            <Page.Header
                title="Ученики"
            />

            <Page.Content>
                <Grid>
                    {enrollments.map(enrollment =>
                        <EnrollmentCard
                            component={Link}
                            to={enrollment.url}
                            enrollment={enrollment}
                        />
                    )}
                </Grid>
            </Page.Content>
        </Page>
    );
}