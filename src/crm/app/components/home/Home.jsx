import AccessGuard from 'shared/components/access-guard';
import Page from 'shared/components/page';
import { Permissions } from 'shared/data/access';
import { isThisWeek, isToday } from 'shared/libs/datetime';
import { Grid } from 'shared/ui-components';

import LessonsList from 'crm/components/lessons/lessons-list';
import MeetingsList from 'crm/components/meetings/meetings-list';
import RequestsList from 'crm/components/requests/requests-list';
import { useStore } from 'crm/hooks/store';

export default function HomePage() {
    const [user] = useStore('user');
    const [requests] = useStore('requests.list');
    const [lessons] = useStore('lessons.list');
    const [meetings] = useStore('meetings.list');

    const requestsToday = requests?.filter(request => isToday(request.createdAt));
    const lessonsToday = lessons?.filter(lesson => isToday(lesson.date)).sort((a, b) => new Date(a.date) - new Date(b.date));
    const meetingsThisWeek = meetings?.filter(meeting => isThisWeek(meeting.startDate));

    return (
        <Page id="home">
            <Page.Header title="Главная" />

            <Page.Content>
                <Grid gap="medium">
                    <AccessGuard user={user} permissions={Permissions.Requests}>
                        <Grid.Item xs={3}>
                            <Page.Section
                                title="Новые заявки"
                                description="Сегодня"
                                compact
                            >
                                <RequestsList
                                    requests={requestsToday}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>

                    <AccessGuard user={user} permissions={Permissions.Lessons}>
                        <Grid.Item xs={3}>
                            <Page.Section
                                title="Уроки"
                                description="Сегодня"
                                compact
                            >
                                <LessonsList
                                    lessons={lessonsToday}
                                    statusIcon={false}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>

                    <AccessGuard user={user} permissions={Permissions.Meetings}>
                        <Grid.Item xs={3}>
                            <Page.Section
                                title="Встречи"
                                description="Эта неделя"
                                compact
                            >
                                <MeetingsList
                                    meetings={meetingsThisWeek}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>
                </Grid>
            </Page.Content>
        </Page>
    );
}