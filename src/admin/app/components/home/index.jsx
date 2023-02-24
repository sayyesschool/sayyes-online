import { useTodaysLessons } from 'shared/hooks/lessons';
import Grid from 'shared/ui-components/grid';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import RequestsList from 'app/components/requests/requests-list';
import LessonsList from 'app/components/lessons/lessons-list';

import './index.scss';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useTodaysLessons();

    return (
        <Page id="home">
            <Page.Header title="Главная" />

            <Page.Content>
                <Grid columns="4">
                    <Page.Section title="Новые заявки" compact>
                        <RequestsList
                            requests={requests}
                        />
                    </Page.Section>

                    <Page.Section title="Уроки сегодня" compact>
                        <LessonsList
                            lessons={lessons}
                        />
                    </Page.Section>

                    <Page.Section title="Мои задачи" compact>

                    </Page.Section>
                </Grid>
            </Page.Content>
        </Page>
    );
}