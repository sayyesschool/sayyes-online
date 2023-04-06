import { Redirect } from 'react-router-dom';

import { useEnrollments } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import './index.scss';

export default function EnrollmentsPage() {
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    const enrollment = enrollments[0];

    return <Redirect to={enrollment.url} />;

    // return (
    //     <Page id="enrollments-page">
    //         <PageHeader
    //             title="Занятия"
    //         />

    //         <PageContent>
    //             <LayoutGrid>
    //                 {enrollments.map(enrollment =>
    //                     <LayoutGrid.Cell key={enrollment.id} span="4">
    //                         <EnrollmentCard
    //                             enrollment={enrollment}
    //                         />
    //                     </LayoutGrid.Cell>
    //                 )}
    //             </LayoutGrid>
    //         </PageContent>
    //     </Page>
    // );
}