import React from 'react';
import {
    Card,
    LayoutGrid as Grid
} from 'mdc-react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import RequstList from 'app/components/requests/request-list';
import LessonList from 'app/components/lessons/lesson-list';

import './index.scss';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useStore('lessons.list');

    return (
        <Page id="home">
            <PageHeader
                title="Главная"
            />

            <PageContent>
                <Grid>
                    <Grid.Cell span="3">
                        <Card outlined>
                            <Card.Header title="Заявки" />

                            {requests &&
                                <RequstList
                                    requests={requests}
                                />
                            }
                        </Card>
                    </Grid.Cell>

                    <Grid.Cell span="3">
                        <Card outlined>
                            <Card.Header title="Уроки" subtitle="Сегодня" />

                            {lessons &&
                                <LessonList
                                    lessons={lessons}
                                />
                            }
                        </Card>
                    </Grid.Cell>
                </Grid>
            </PageContent>
        </Page>
    );
}