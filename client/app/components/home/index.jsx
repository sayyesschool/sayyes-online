import React, { useState } from 'react';
import {
    Card,
    Icon,
    Layout,
    LayoutGrid,
    SegmentedButton,
    Typography
} from 'mdc-react';

import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useMeetings } from 'shared/hooks/meetings';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import Calendar from 'shared/components/calendar';

import PaymentNoticeCard from 'app/components/shared/payment-notice-card';
import EnrollmentCard from 'app/components/enrollments/enrollment-card';
import MeetingCard from 'app/components/meetings/meeting-card';

import './index.scss';

export default function HomePage() {
    const [enrollments] = useEnrollments();
    const [lessons] = useLessons();
    const [meetings] = useMeetings();

    const [view, setView] = useState('week');

    if (!enrollments || !lessons || !meetings) return <LoadingIndicator />;

    const events = [
        ...lessons.map(lesson => ({
            id: lesson.id,
            title: 'Урок',
            icon: 'school',
            date: lesson.date,
            url: lesson.url
        })),
        ...meetings.map(meeting => ({
            id: meeting.id,
            title: 'Встреча',
            icon: 'voice_chat',
            date: meeting.date,
            url: meeting.url
        }))
    ];
    console.log(events);
    return (
        <Page id="home-page">
            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="4">
                        <section>
                            <Typography type="headline6">Мои занятия</Typography>

                            {(enrollments?.length > 0) ?
                                enrollments.map(enrollment =>
                                    <EnrollmentCard
                                        key={enrollment.id}
                                        enrollment={enrollment}
                                    />
                                )
                                :
                                <Typography type="body1">Вы пока не занимаетесь</Typography>
                            }
                        </section>

                        <section>
                            <Typography type="headline6">Мои встречи разговорного клуба</Typography>

                            {(meetings?.length > 0) ?
                                meetings.map(meeting =>
                                    <MeetingCard
                                        key={meeting.id}
                                        meeting={meeting}
                                    />
                                )
                                :
                                <Typography type="body1">Встреч пока не запланировано</Typography>
                            }
                        </section>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <Layout row justifyContent="between" alignItems="center">
                            <Typography type="headline6">Календарь</Typography>

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
                                events={events}
                            />
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}