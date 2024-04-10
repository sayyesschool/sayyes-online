import Page from 'shared/components/page';
import { useTodaysLessons } from 'shared/hooks/lessons';
import { Grid } from 'shared/ui-components';

import LessonsList from 'crm/components/lessons/lessons-list';
import RequestsList from 'crm/components/requests/requests-list';
import { useStore } from 'crm/hooks/store';

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