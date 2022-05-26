import {
    Card
} from 'mdc-react';

import LessonPillGroup from 'shared/components/lessons-pill-group';

export default function EnrollmentLessons({ enrollment }) {
    const lessonsDuration = enrollment.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    const lessonsDurationDelta = enrollment.lessonDuration * enrollment.lessons.length - lessonsDuration;

    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    subtitle={lessonsDurationDelta !== 0 && ((lessonsDurationDelta < 0 ? 'Превышение на' : 'Осталось') + ` ${Math.abs(lessonsDurationDelta)} мин.`)}
                />

                {enrollment.lessons.length > 0 &&
                    <Card.Section secondary>
                        <LessonPillGroup
                            lessons={enrollment.lessons}
                        />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}