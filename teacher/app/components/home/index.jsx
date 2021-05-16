import React, { useState } from 'react';
import {
    Card,
    Icon,
    LayoutGrid,
    SegmentedButton
} from 'mdc-react';

import api from 'shared/services/api';
import { useUser } from 'shared/hooks/user';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useMeetings } from 'shared/hooks/meetings';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CalendarCard from 'shared/components/calendar-card';

import StudentList from 'app/components/students/student-list';

import './index.scss';

export default function HomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();

    if (!enrollments) return <LoadingIndicator />;

    const students = enrollments.map(enrollment => {
        const student = enrollment.client;

        student.url = enrollment.url;

        return student;
    });

    const lessons = [];

    return (
        <Page id="home-page">
            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="4">
                        <Card outlined>
                            <Card.Header
                                title="Мои ученики"
                                subtitle={`Количество учеников: ${students.length}`}
                            />

                            <StudentList
                                students={students}
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