import { useUser } from 'shared/hooks/user';
import { useEnrollments } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import EnrollmentDetailsCard from 'app/components/enrollments/enrollment-details-card';

export default function LearnerHomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();

    const activeEnrollments = enrollments?.filter(enrollment => enrollment.status === 'active');

    if (!user) return <LoadingIndicator fullscreen />;

    return (
        <Page className="HomePage">
            <Page.Content>
                {activeEnrollments?.map(enrollment =>
                    <EnrollmentDetailsCard
                        key={enrollment.id}
                        user={user}
                        enrollment={enrollment}
                    />
                )}
            </Page.Content>
        </Page>
    );
}