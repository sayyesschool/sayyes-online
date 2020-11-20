import React, { useState } from 'react';
import {
    Card,
    ChipSet, Chip,
    Icon,
    Layout,
    LayoutGrid,
    Typography
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

    const lessons = enrollments.reduce((lessons, enrollment) => {
        return lessons.concat(...enrollment.lessons.map(lesson => ({ ...lesson, client: enrollment.client })));
    }, []);

    return (
        <Page id="home-page">
            <PageContent>
                <Card outlined>
                    <Card.Header
                        title="Расписание уроков"
                        actions={
                            <ChipSet>
                                <Chip
                                    icon={<Icon>view_week</Icon>}
                                    text="Неделя"
                                    onClick={() => setView('week')}
                                />

                                <Chip
                                    icon={<Icon>today</Icon>}
                                    text="Месяц"
                                    onClick={() => setView('month')}
                                />
                            </ChipSet>
                        }
                    />

                    <Calendar
                        view={view}
                        events={lessons}
                    />
                </Card>

                {/* <Card outlined>
                            <StudentList
                                students={students}
                            />
                        </Card> */}
            </PageContent>
        </Page>
    );
}