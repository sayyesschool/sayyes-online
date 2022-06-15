import LessonPillGroup from 'shared/components/lessons-pill-group';
import PageSection from 'shared/components/page-section';

export default function EnrollmentLessons({ enrollment }) {
    const lessonsDuration = enrollment.lessons.reduce((total, lesson) => total + lesson.duration, 0);
    const lessonsDurationDelta = enrollment.lessonDuration * enrollment.lessons.length - lessonsDuration;

    return (
        <PageSection
            className="enrollment-lessons"
            title="Занятия"
            description={lessonsDurationDelta !== 0 && ((lessonsDurationDelta < 0 ? 'Превышение на' : 'Осталось') + ` ${Math.abs(lessonsDurationDelta)} мин.`)}
        >
            {enrollment.lessons.length > 0 &&
                <LessonPillGroup
                    lessons={enrollment.lessons}
                />
            }
        </PageSection>
    );
}