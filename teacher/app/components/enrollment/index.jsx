import React, { useState, useCallback } from 'react';
import {
    Icon,
    LayoutGrid,
    FAB
} from 'mdc-react';

import { useUser } from 'shared/hooks/user';
import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import EnrollmentCourses from './enrollment-courses';
import EnrollmentDetails from './enrollment-details';
import EnrollmentLessons from './enrollment-lessons';
import EnrollmentMaterials from './enrollment-materials';
import EnrollmentPosts from './enrollment-posts';
import EnrollmentSchedule from './enrollment-schedule';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [user] = useUser();
    const [enrollment, actions] = useEnrollment(match.params.id);

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

    console.log(enrollment);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page id="enrollment-page">
            <PageHeader
                title={enrollment.domainLabel}
                breadcrumbs={[<span>{enrollment.client.fullname}</span>]}
                actions={[
                    <FAB
                        key="class"
                        element="a"
                        href={enrollment.classUrl}
                        icon={<Icon>video_call</Icon>}
                        label="Перейти в класс"
                    />
                ]}
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="8">
                        <EnrollmentPosts
                            enrollment={enrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell grid span="4">
                        <LayoutGrid.Cell span="12">
                            <EnrollmentDetails
                                enrollment={enrollment}
                            />
                        </LayoutGrid.Cell>

                        <LayoutGrid.Cell span="12">
                            <EnrollmentSchedule
                                enrollment={enrollment}
                            />
                        </LayoutGrid.Cell>

                        <LayoutGrid.Cell span="12">
                            <EnrollmentLessons
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
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}