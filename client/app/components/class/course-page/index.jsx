import React, { useRef, useState, useEffect } from 'react';

import { useSync } from 'shared/hooks/twilio/sync';
import { useSelector } from 'shared/hooks/store';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import Chat from 'shared/components/chat';
import Room from 'shared/components/room';

import { useEnrollment } from 'app/hooks/enrollment';
import CourseContent from 'app/components/class/course-content';

import './index.scss';

export default function CoursePage({ match }) {
    const user = useSelector(state => state.account);
    //const syncClientRef = useSync(user.id);
    const [enrollment, actions] = useEnrollment(match.params.id);
    const [document, setDocument] = useState();
    const [isSideSheetOpen, setSideSheetOpen] = useState(false);

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

    if (!enrollment) return <LoadingIndicator />;

    return (
        <>
            <PageSideSheet
                className="class-side-sheet"
                appContentSelector="#class-page"
            >
                <Room
                    identity={user.id}
                    name={enrollment.id}
                    video={true}
                    audio={true}
                />

                <Chat
                    identity={user.id}
                    name={enrollment.id}
                />
            </PageSideSheet>

            <Page id="enrollment-page">
                <PageContent>
                    <CourseContent
                        course={enrollment.course}
                        unit={enrollment.course.units[0]}
                    />
                </PageContent>
            </Page>
        </>
    );
}