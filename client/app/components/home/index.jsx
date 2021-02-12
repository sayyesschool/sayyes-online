import React, { useCallback, useState } from 'react';
import {
    Card,
    Icon,
    Layout,
    LayoutGrid,
    SegmentedButton,
    Typography
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
import Calendar from 'shared/components/calendar';

import EnrollmentDetailsCard from 'app/components/enrollments/enrollment-details-card';
import EnrollmentStatusCard from 'app/components/enrollments/enrollment-status-card';
import EnrollmentPayCard from 'app/components/enrollments/enrollment-pay-card';
import MeetingCard from 'app/components/meetings/meeting-card';

import './index.scss';

export default function HomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();
    const [lessons] = useLessons();
    const [meetings] = useMeetings();

    const [view, setView] = useState('week');
    const [isPaying, setPaying] = useState(false);

    const handleCheckout = useCallback(data => {
        api.post('/api/payments', data)
            .then(({ data }) => {
                if (data.confirmationUrl) {
                    window.location.replace(data.confirmationUrl);
                }
            });
    }, []);

    if (!user || !enrollments || !lessons || !meetings) return <LoadingIndicator />;

    const events = [
        ...lessons.map(lesson => ({
            id: lesson.id,
            title: 'Урок',
            icon: 'school',
            date: new Date(lesson.date),
            url: lesson.url
        })),
        ...meetings.map(meeting => ({
            id: meeting.id,
            title: 'Встреча',
            icon: 'voice_chat',
            date: new Date(meeting.date),
            url: meeting.url
        }))
    ];
    const activeEnrollment = enrollments[0];

    return (
        <Page id="home-page">
            <PageHeader pullContent />

            <PageContent>
                <LayoutGrid>
                    {!activeEnrollment?.status !== 'active' &&
                        <LayoutGrid.Cell span="12">
                            <EnrollmentStatusCard
                                enrollment={activeEnrollment}
                            />
                        </LayoutGrid.Cell>
                    }

                    <LayoutGrid.Cell span="12">
                        {isPaying ?
                            <EnrollmentPayCard
                                enrollment={activeEnrollment}
                                onCheckout={handleCheckout}
                                onCancel={() => setPaying(false)}
                            />
                            :
                            <EnrollmentDetailsCard
                                enrollment={activeEnrollment}
                                onPay={() => setPaying(true)}
                            />
                        }

                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="12">
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

                    <LayoutGrid.Cell span="4">
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
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}