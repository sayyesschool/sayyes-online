import React, { useState, useCallback } from 'react';
import {
    FAB,
    Icon,
    LayoutGrid
} from 'mdc-react';

import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSideSheet from 'shared/components/page-side-sheet';
import Chat from 'shared/components/chat';

import EnrollmentAssignments from 'app/components/enrollments/enrollment-assignments';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPosts from 'app/components/enrollments/enrollment-posts';
import PaymentBanner from 'app/components/shared/payment-banner';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [user] = useUser();
    const [enrollment] = useEnrollment(match.params.id);

    const [isChatOpen, setChatOpen] = useState(false);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <>
            <PageSideSheet
                title="Чат"
                open={isChatOpen}
                onClose={() => setChatOpen(false)}
            >
                <Chat
                    name={enrollment.id}
                    user={user}
                />
            </PageSideSheet>

            <div>
                <PaymentBanner onActionClick={() => setDialogOpen(true)} />

                <Page id="enrollment-page">
                    <PageHeader
                        title={enrollment.title}
                        actions={[
                            <FAB
                                key="class"
                                element="a"
                                href={enrollment.classUrl}
                                icon={<Icon>video_call</Icon>}
                                label="Перейти в класс"
                            />
                        ]}
                        pullContent
                    >
                        <EnrollmentDetails
                            enrollment={enrollment}
                        />
                    </PageHeader>

                    <PageContent>
                        <LayoutGrid>
                            <LayoutGrid.Cell grid span="3">
                                <LayoutGrid.Cell span="12">
                                    <EnrollmentCourses
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>

                                <LayoutGrid.Cell span="12">
                                    <EnrollmentMaterials
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>
                            </LayoutGrid.Cell>

                            <LayoutGrid.Cell grid span="9">
                                <LayoutGrid.Cell span="4">
                                    <EnrollmentLessons
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>

                                <LayoutGrid.Cell span="4">
                                    <EnrollmentAssignments
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>

                                <LayoutGrid.Cell span="4">
                                    <EnrollmentPosts
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>
                            </LayoutGrid.Cell>
                        </LayoutGrid>
                    </PageContent>
                </Page>

                <FAB
                    className="chat-button"
                    key="chat"
                    icon={<Icon>chat</Icon>}
                    onClick={() => setChatOpen(true)}
                />
            </div>
        </>
    );
}