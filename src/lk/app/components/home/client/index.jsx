import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useUser } from 'shared/hooks/user';

import EnrollmentDetailsCard from 'lk/components/enrollments/enrollment-details-card';
import EnrollmentPayCard from 'lk/components/enrollments/enrollment-pay-card';
import EnrollmentStatusCard from 'lk/components/enrollments/enrollment-status-card';

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

    if (!user || !enrollments) return <LoadingIndicator fullscreen />;

    // const events = lessons.map(lesson => ({
    //     id: lesson.id,
    //     title: 'Урок',
    //     icon: 'school',
    //     date: new Date(lesson.date),
    //     url: lesson.url
    // }));

    return (
        <Page className="HomePage">
            <Page.Content>
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
            </Page.Content>
        </Page>
    );
}