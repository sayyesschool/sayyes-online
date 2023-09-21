import { useCallback } from 'react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import LessonContent from 'lms/components/courses/lesson-content';

import './index.scss';

export default function LessonPage({ match, location }) {
    const [course, actions] = useCourse(match.params.course, location.search);

    const handleExerciseProgressChange = useCallback((exercise, data) => {
        return actions.updateExerciseProgress(exercise.progressId, {
            ...data,
            enrollmentId: course.enrollmentId,
            courseId: course.id,
            exerciseId: exercise.id
        });
    }, [course]);

    const lesson = course?.lessonsById.get(match.params.lesson);
    const unit = course?.unitsById.get(lesson.unitId);

    if (!lesson) return <LoadingIndicator />;

    return (
        <Page className="LessonPage">
            <Page.Header
                title={lesson.title}
                breadcrumbs={[
                    { to: course.uri, content: course.title },
                    { to: unit.uri, content: unit.title }
                ]}
            />

            <Page.Content>
                <LessonContent
                    lesson={lesson}
                    onExerciseProgressChange={handleExerciseProgressChange}
                />
            </Page.Content>
        </Page>
    );
}