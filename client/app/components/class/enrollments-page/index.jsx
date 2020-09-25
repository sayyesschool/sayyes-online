import React, { useRef, useState, useEffect } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';

import { useEnrollments } from 'app/hooks/enrollment';
import ClassCard from 'app/components/class/class-card';

import './index.scss';

export default function EnrollmentsPage() {
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    return (
        <Page id="enrollments-page">
            <PageContent>
                <ClassCard
                    enrollment={enrollments[0]}
                />
            </PageContent>
        </Page>
    );
}