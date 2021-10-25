import { useState } from 'react';
import {
    Card,
    Icon,
    LayoutGrid,
    SegmentedButton
} from 'mdc-react';

import { useUser } from 'shared/hooks/user';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useMeetings } from 'shared/hooks/meetings';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import CalendarCard from 'shared/components/calendar-card';

import EnrollmentList from 'app/components/enrollments/enrollment-list';

import './index.scss';

export default function HomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    const lessons = [];

    return (
        <Page id="home-page">
            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="4">
                        <Card outlined>
                            <Card.Header
                                title="Мои ученики"
                            />

                            <EnrollmentList
                                enrollments={enrollments}
                            />
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <CalendarCard
                            title="Календарь"
                            lessons={lessons}
                        />
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}