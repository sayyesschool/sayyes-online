import React, { useRef, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useSync } from 'shared/hooks/twilio/sync';
import { useSelector } from 'shared/hooks/store';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import Chat from 'shared/components/chat';
import Room from 'shared/components/room';

import { useEnrollment } from 'app/hooks/enrollment';
import EnrollmentDetails from 'app/components/class/enrollment-details';
import UnitContent from 'app/components/class/unit-content';

import './index.scss';

export default function EnrollmentPage({ match }) {
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
                appContentSelector="#enrollment-page"
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
                    <Switch>
                        <Route exact path="/class/:id" render={props =>
                            <EnrollmentDetails
                                enrollment={enrollment}
                            />
                        } />

                        <Route path="/class/:id/course/:unit?" render={props =>
                            <UnitContent
                                enrollment={enrollment}
                                course={enrollment.course}
                                unit={enrollment.course.units.find(unit => unit.slug === props.match.params.unit)}
                            />
                        } />
                    </Switch>
                </PageContent>
            </Page>
        </>
    );
}