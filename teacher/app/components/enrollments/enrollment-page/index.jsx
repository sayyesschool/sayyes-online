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

import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPosts from 'app/components/enrollments/enrollment-posts';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import StudentDetails from 'app/components/students/student-details';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);

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
                            <StudentDetails
                                student={enrollment.client}
                            />
                        </LayoutGrid.Cell>

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