import Page from 'shared/components/page';
import { Flex, Heading } from 'shared/ui-components';

import LessonsList from 'lms/components/lessons/lessons-list';

export default function LessonsSection({ lessons, onLessonClick }) {
    const now = new Date();

    const upcomingLessons = lessons?.filter(lesson =>
        new Date(lesson.date) > now
    );

    const pastLessons = lessons?.filter(lesson =>
        new Date(lesson.date) < now
    );

    return (
        <Page.Section className="LessonsSection">
            <Flex dir="column" gap="small">
                {upcomingLessons?.length > 0 &&
                    <section className="LessonsSection__upcoming">
                        <Heading
                            type="title-lg"
                            content="Предстоящие уроки"
                        />

                        <LessonsList
                            lessons={upcomingLessons}
                            onItemClick={onLessonClick}
                        />
                    </section>
                }

                {pastLessons?.length > 0 &&
                    <section className="LessonsSection__past">
                        <Heading
                            type="title-lg"
                            content="Прошедшие уроки"
                        />

                        <LessonsList
                            lessons={pastLessons}
                            onItemClick={onLessonClick}
                        />
                    </section>
                }
            </Flex>
        </Page.Section>
    );
}