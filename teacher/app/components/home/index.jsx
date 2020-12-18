import React, { useState } from 'react';
import {
    Card,
    Icon,
    LayoutGrid,
    SegmentedButton
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import LoadingIndicator from 'shared/components/loading-indicator';
import Calendar from 'shared/components/calendar';

import StudentList from 'app/components/students/student-list';

import './index.scss';

export default function HomePage() {
    const enrollments = useSelector(store => store.enrollments.list);
    //const lessons = useSelector(store => store.lessons);

    const [view, setView] = useState('week');

    if (!enrollments) return <LoadingIndicator />;

    const students = enrollments.map(enrollment => {
        const student = enrollment.client;

        student.url = enrollment.url;

        return student;
    });

    const lessons = enrollments.reduce((lessons, enrollment) => {
        return lessons.concat(...enrollment.lessons.map(lesson => ({ ...lesson, client: enrollment.client })));
    }, []);

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
                        <Card outlined>
                            <Card.Header
                                title="Расписание"
                                actions={
                                    <SegmentedButton>
                                        <SegmentedButton.Segment
                                            icon={<Icon>view_week</Icon>}
                                            label="Неделя"
                                            selected={view === 'week'}
                                            onClick={() => setView('week')}
                                        />

                                        <SegmentedButton.Segment
                                            icon={<Icon>today</Icon>}
                                            label="Месяц"
                                            selected={view === 'month'}
                                            onClick={() => setView('month')}
                                        />
                                    </SegmentedButton>
                                }
                            />

                            <Calendar
                                view={view}
                                events={lessons}
                            />
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}