import {
    Card,
    LayoutGrid
} from 'mdc-react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import RequestsList from 'app/components/requests/requests-list';
import LessonList from 'app/components/lessons/lesson-list';
import MeetingList from 'app/components/meetings/meeting-list';

import './index.scss';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useStore('lessons.list');
    const [meetings] = useStore('meetings.list');

    return (
        <Page id="home">
            <PageTopBar
                title="Главная"
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="3">
                        <Card outlined>
                            <Card.Header title="Заявки в обработке" />

                            {requests &&
                                <RequestsList
                                    requests={requests}
                                />
                            }
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="3">
                        <Card outlined>
                            <Card.Header
                                title="Уроки"
                            />

                            {lessons &&
                                <LessonList
                                    lessons={lessons}
                                />
                            }
                        </Card>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="3">
                        <Card outlined>
                            <Card.Header
                                title="Встречи"
                            />

                            {meetings &&
                                <MeetingList
                                    meetings={meetings}
                                />
                            }
                        </Card>
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}