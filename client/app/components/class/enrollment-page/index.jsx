import React, { useState } from 'react';

import { useSync } from 'shared/hooks/twilio/sync';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';

import { useEnrollment } from 'app/hooks/enrollment';
import EnrollmentDetails from 'app/components/class/enrollment-details';

import './index.scss';

export default function EnrollmentPage({ match }) {
    //const syncClientRef = useSync(user.id);
    const [enrollment, actions] = useEnrollment(match.params.enrollmentId);
    const [document, setDocument] = useState();

    // useEffect(() => {
    //     if (enrollment) {
    //         syncClientRef.current?.document(enrollment.id).then(document => {
    //             document.on('updated', update => {
    //                 if (update.isLocal) return;

    //                 setDocument(update.value);
    //             });

    //             setDocument(document);
    //         });
    //     }

    //     return () => document?.close();
    // }, [enrollment]);

    return (
        <Page id="enrollment-page">
            <PageContent>
                <EnrollmentDetails
                    enrollment={enrollment}
                />
            </PageContent>
        </Page>
    );
}