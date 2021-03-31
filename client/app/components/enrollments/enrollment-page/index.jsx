import React, { useState, useCallback } from 'react';
import {
    FAB,
    Icon,
    LayoutGrid
} from 'mdc-react';

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

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);

    if (!enrollment) return <LoadingIndicator />;

    return (
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
                    <LayoutGrid.Cell span="8">
                        <EnrollmentPosts
                            enrollment={enrollment}
                        />
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="4" grid>
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