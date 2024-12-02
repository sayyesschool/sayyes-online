import AccessGuard from 'shared/components/access-guard';
import Page from 'shared/components/page';
import { Permissions } from 'shared/data/access';
import { useTodaysLessons } from 'shared/hooks/lessons';
import { Grid } from 'shared/ui-components';

import LessonsList from 'crm/components/lessons/lessons-list';
import MeetingsList from 'crm/components/meetings/meetings-list';
import RequestsList from 'crm/components/requests/requests-list';
import { useStore } from 'crm/hooks/store';

export default function HomePage() {
    const [user] = useStore('user');
    const [requests] = useStore('requests.list');
    const [meetings] = useStore('meetings.list');
    const [lessons] = useTodaysLessons();

    const currentMeetings = meetings?.sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter(meeting => meeting.status === 'started' || meeting.status === 'scheduled');

    return (
        <Page id="home">
            <Page.Header title="Главная" />

            <Page.Content>
                <Grid gap="medium">
                    <AccessGuard user={user} permissions={Permissions.Requests}>
                        <Grid.Item xs={3}>
                            <Page.Section title="Новые заявки" compact>
                                <RequestsList
                                    requests={requests}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>

                    <AccessGuard user={user} permissions={Permissions.Lessons}>
                        <Grid.Item xs={3}>
                            <Page.Section title="Уроки сегодня" compact>
                                <LessonsList
                                    lessons={lessons}
                                    statusIcon={false}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>

                    <AccessGuard user={user} permissions={Permissions.Meetings}>
                        <Grid.Item xs={3}>
                            <Page.Section title="Предстоящие встречи" compact>
                                <MeetingsList
                                    meetings={currentMeetings}
                                />
                            </Page.Section>
                        </Grid.Item>
                    </AccessGuard>
                </Grid>
            </Page.Content>
        </Page>
    );
}