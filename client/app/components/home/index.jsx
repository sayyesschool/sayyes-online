import React, { useState } from 'react';
import {
    Card,
    ChipSet, Chip,
    Icon,
    Layout,
    IconButton,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import Calendar from 'shared/components/calendar';

import EnrollmentCard from 'app/components/class/enrollment-card';

import './index.scss';

export default function HomePage() {
    const user = useSelector(store => store.user);
    const enrollments = useSelector(store => store.enrollments.list);
    const meetings = useSelector(store => store.meetings || []);
    const lessons = useSelector(store => store.lessons);

    const [view, setView] = useState('week');

    return (
        <Page id="home-page">
            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="4">
                        <Typography variant="headline6">Моё обучение</Typography>

                        {enrollments?.map(enrollment =>
                            <EnrollmentCard
                                key={enrollment.id}
                                enrollment={enrollment}
                            />
                        )}
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <Layout row justifyContent="between" alignItems="center">
                            <Typography variant="headline6">Календарь занятий</Typography>

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
                        </Layout>

                        <Card outlined>
                            <Calendar
                                view={view}
                                events={lessons}
                            />
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="12">
                        <Typography variant="headline6">Ближайшие встречи разговорного клуба</Typography>

                        {meetings.length > 0 ?
                            meetings?.map(meeting =>
                                <EnrollmentCard
                                    key={enrollment.id}
                                    enrollment={enrollment}
                                />
                            ) : (
                                <Typography variant="body1">Встреч пока не запланировано</Typography>
                            )
                        }
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}