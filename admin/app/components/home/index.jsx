import React from 'react';
import {
    Card,
    LayoutGrid as Grid
} from 'mdc-react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import RequestList from 'app/components/requests/request-list';
import LessonList from 'app/components/lessons/lesson-list';
import MeetingList from 'app/components/meetings/meeting-list';

import './index.scss';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useStore('lessons.list');
    const [meetings] = useStore('meetings.list');

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
                                <RequestList
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

                    <Grid.Cell span="3">
                        <Card outlined>
                            <Card.Header title="Встречи" subtitle="Сегодня" />

                            {meetings &&
                                <MeetingList
                                    meetings={meetings}
                                />
                            }
                        </Card>
                    </Grid.Cell>
                </Grid>
            </PageContent>
        </Page>
    );
}