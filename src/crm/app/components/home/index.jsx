import { useTodaysLessons } from 'shared/hooks/lessons';
import { Grid } from 'shared/ui-components';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import LessonsList from 'app/components/lessons/lessons-list';
import MeetingsList from 'app/components/meetings/meetings-list';
import RequestsList from 'app/components/requests/requests-list';

export default function HomePage() {
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
                    <Grid.Item xs={3}>
                        <Page.Section title="Новые заявки" compact>
                            <RequestsList
                                requests={requests}
                            />
                        </Page.Section>
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <Page.Section title="Уроки сегодня" compact>
                            <LessonsList
                                lessons={lessons}
                                statusIcon={false}
                            />
                        </Page.Section>
                    </Grid.Item>

                    <Grid.Item xs={3}>
                        <Page.Section title="Уроки сегодня" compact>
                            <MeetingsList
                                meetings={currentMeetings}
                            />
                        </Page.Section>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}