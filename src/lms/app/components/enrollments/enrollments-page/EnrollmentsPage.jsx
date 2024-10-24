import { Redirect } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import { useEnrollments } from 'shared/hooks/enrollments';

export default function EnrollmentsPage() {
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    const enrollment = enrollments[0];

    return <Redirect to={enrollment.url} />;

    // return (
    //     <Page id="enrollments-page">
    //         <Page.Header
    //             title="Занятия"
    //         />

    //         <Page.Content>
    //             <LayoutGrid>
    //                 {enrollments.map(enrollment =>
    //                     <LayoutGrid.Cell key={enrollment.id} span="4">
    //                         <EnrollmentCard
    //                             enrollment={enrollment}
    //                         />
    //                     </LayoutGrid.Cell>
    //                 )}
    //             </LayoutGrid>
    //         </Page.Content>
    //     </Page>
    // );
}