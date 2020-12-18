import React, { useState, useCallback } from 'react';
import {
    FAB,
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

import EnrollmentAssignments from './enrollment-assignments';
import EnrollmentCourses from './enrollment-courses';
import EnrollmentDetails from './enrollment-details';
import EnrollmentLessons from './enrollment-lessons';
import EnrollmentMaterials from './enrollment-materials';
import EnrollmentPosts from './enrollment-posts';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [user] = useUser();
    const [enrollment, actions] = useEnrollment(match.params.id);

    const [isChatOpen, setChatOpen] = useState(false);

    const handleCreateLesson = useCallback(data => {
        data.client = enrollment.client.id;
        data.teacher = enrollment.teacher.id;
        data.enrollment = enrollment.id;

        actions.createLesson(data);
    }, [enrollment]);

    const handleCreateAssignment = useCallback(data => {
        data.client = enrollment.client.id;
        data.teacher = enrollment.teacher.id;
        data.enrollment = enrollment.id;

        actions.createAssignment(data);
    }, [enrollment]);

    const handleCreatePost = useCallback(data => {
        data.client = enrollment.client.id;
        data.teacher = enrollment.teacher.id;
        data.enrollment = enrollment.id;

        actions.createPost(data);
    }, [enrollment]);

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
                <Page id="enrollment-page">
                    <PageHeader
                        title={`${enrollment.title}`}
                        breadcrumbs={[<span>{enrollment.client.fullname}</span>]}
                        actions={[
                            { key: 'chat', icon: 'forum', title: 'Чат', onClick: () => setChatOpen(true) },
                            { key: 'class', element: 'a', href: enrollment.classUrl, target: '_blank', label: 'Перейти в класс', raised: true }
                        ]}
                    />

                    <PageContent>
                        <LayoutGrid>
                            <LayoutGrid.Cell grid span="3">
                                <LayoutGrid.Cell span="12">
                                    <EnrollmentDetails
                                        enrollment={enrollment}
                                    />
                                </LayoutGrid.Cell>

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
            </div>
        </>
    );
}