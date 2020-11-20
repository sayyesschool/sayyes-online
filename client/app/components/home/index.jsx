import React, { useState } from 'react';
import {
    Card,
    ChipSet, Chip,
    Icon,
    Layout,
    IconButton,
    LayoutGrid,
    SegmentedButton,
    Typography
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import Calendar from 'shared/components/calendar';

import EnrollmentCard from 'app/components/shared/enrollment-card';

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
                        <section>
                            <Typography type="headline6">Моё обучение</Typography>

                            {enrollments?.map(enrollment =>
                                <EnrollmentCard
                                    key={enrollment.id}
                                    enrollment={enrollment}
                                />
                            )}
                        </section>

                        <section>
                            <Typography type="headline6">Ближайшие встречи разговорного клуба</Typography>

                            {meetings.length > 0 ?
                                meetings?.map(meeting =>
                                    <EnrollmentCard
                                        key={enrollment.id}
                                        enrollment={enrollment}
                                    />
                                ) : (
                                    <Typography type="body1">Встреч пока не запланировано</Typography>
                                )
                            }
                        </section>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <Layout row justifyContent="between" alignItems="center">
                            <Typography type="headline6">Календарь занятий</Typography>

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
                        </Layout>

                        <Card outlined>
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