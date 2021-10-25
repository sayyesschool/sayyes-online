import { useCallback, useState } from 'react';
import {
    LayoutGrid
} from 'mdc-react';

import api from 'shared/services/api';
import { useUser } from 'shared/hooks/user';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import CalendarCard from 'shared/components/calendar-card';

import EnrollmentDetailsCard from 'app/components/enrollments/enrollment-details-card';
import EnrollmentStatusCard from 'app/components/enrollments/enrollment-status-card';
import EnrollmentPayCard from 'app/components/enrollments/enrollment-pay-card';

import './index.scss';

export default function HomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();
    const [lessons] = useLessons();

    const [isPaying, setPaying] = useState(false);

    const handleCheckout = useCallback(data => {
        api.post('/api/payments', data)
            .then(({ data }) => {
                if (data.confirmationUrl) {
                    window.location.replace(data.confirmationUrl);
                }
            });
    }, []);

    if (!user || !enrollments || !lessons) return <LoadingIndicator />;

    const activeEnrollment = enrollments[0];
    const events = lessons.map(lesson => ({
        id: lesson.id,
        title: 'Урок',
        icon: 'school',
        date: new Date(lesson.date),
        url: lesson.url
    }));

    return (
        <Page id="home-page">
            <PageHeader pullContent />

            <PageContent>
                <LayoutGrid>
                    {activeEnrollment?.status !== 'active' &&
                        <LayoutGrid.Cell span="12">
                            <EnrollmentStatusCard
                                enrollment={activeEnrollment}
                            />
                        </LayoutGrid.Cell>
                    }

                    {activeEnrollment?.status !== 'processing' &&
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
                    }

                    {events.length > 0 &&
                        <LayoutGrid.Cell span="12">
                            <CalendarCard
                                title="Календарь"
                                events={events}
                            />
                        </LayoutGrid.Cell>
                    }

                    {/* <LayoutGrid.Cell span="4">
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
                    </LayoutGrid.Cell> */}
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}