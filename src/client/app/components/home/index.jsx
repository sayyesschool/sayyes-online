import { useCallback, useState } from 'react';

import http from 'shared/services/http';
import { useUser } from 'shared/hooks/user';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { Grid } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import CalendarCard from 'shared/components/calendar-card';

import EnrollmentDetailsCard from 'app/components/enrollments/enrollment-details-card';
import EnrollmentStatusCard from 'app/components/enrollments/enrollment-status-card';
import EnrollmentPayCard from 'app/components/enrollments/enrollment-pay-card';

import './index.scss';

export default function HomePage() {
    const [user] = useUser();
    const [enrollments, enrollmentActions] = useEnrollments();
    const [lessons] = useLessons();

    const [isPaying, setPaying] = useState(false);

    const activeEnrollment = enrollments?.at(0);

    const handleCheckout = useCallback(data => {
        enrollmentActions.payEnrollment(activeEnrollment.id, data)
            .then(data => {
                if (data.confirmationUrl) {
                    window.location.replace(data.confirmationUrl);
                }
            });
    }, [activeEnrollment]);

    if (!user || !enrollments) return <LoadingIndicator />;

    // const events = lessons.map(lesson => ({
    //     id: lesson.id,
    //     title: 'Урок',
    //     icon: 'school',
    //     date: new Date(lesson.date),
    //     url: lesson.url
    // }));

    return (
        <Page id="home-page">
            <Page.Content>
                <Grid columns={1}>
                    {activeEnrollment?.status !== 'active' &&
                        <EnrollmentStatusCard
                            enrollment={activeEnrollment}
                        />
                    }

                    {activeEnrollment?.status !== 'processing' &&
                        <>{isPaying ?
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
                        }</>
                    }

                    {/* {events.length > 0 &&
                        <LayoutGrid.Cell span="12">
                            <CalendarCard
                                title="Календарь"
                                events={events}
                            />
                        </LayoutGrid.Cell>
                    } */}

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
                </Grid>
            </Page.Content>
        </Page>
    );
}