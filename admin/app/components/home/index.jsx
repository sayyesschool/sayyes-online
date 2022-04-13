import { useTodaysLessons } from 'shared/hooks/lessons';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import PageHeader from 'shared/components/page-header';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/hooks/store';
import RequestsList from 'app/components/requests/requests-list';
import LessonsList from 'app/components/lessons/lessons-list';
// import MeetingList from 'app/components/meetings/meeting-list';

import './index.scss';

export default function HomePage() {
    const [requests] = useStore('requests.list');
    const [lessons] = useTodaysLessons();

    return (
        <Page id="home">
            <PageHeader title="Главная" />

            <PageContent>
                <PageSection title="Заявки">
                    <RequestsList
                        requests={requests}
                    />
                </PageSection>

                <PageSection title="Уроки сегодня">
                    <LessonsList
                        lessons={lessons}
                    />
                </PageSection>
            </PageContent>
        </Page>
    );
}