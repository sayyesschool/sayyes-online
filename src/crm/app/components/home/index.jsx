import { useTodaysLessons } from 'shared/hooks/lessons';
import Page from 'shared/components/page';
import { Grid } from 'shared/ui-components';

import { useStore } from 'app/hooks/store';
import RequestsList from 'app/components/requests/requests-list';
import LessonsList from 'app/components/lessons/lessons-list';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useTodaysLessons();

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
                </Grid>
            </Page.Content>
        </Page>
    );
}