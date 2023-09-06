import { useCallback } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useLesson } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import EditableText from 'shared/components/editable-text';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Grid } from 'shared/ui-components';

import LessonDescription from 'app/components/courses/lesson-description';
import LessonSections from 'app/components/courses/lesson-sections';

export default function LessonPage({ match, history }) {
    const { course, unit, lesson, actions } = useLesson(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateLesson = useCallback(data => {
        return actions.updateLesson(course.id, lesson.id, data);
    }, [course, lesson]);

    const handleUpdateLessonTitle = useCallback(title => {
        return actions.updateLesson(course.id, lesson.id, { title });
    }, [course, lesson]);

    const handleDeleteLesson = useCallback(() => {
        return actions.deleteLesson(course.id, lesson.id)
            .then(() => history.push(unit.url));
    }, [course, unit, lesson]);

    const handleCreateExercise = useCallback(data => {
        data.unitId = unit.id;
        data.lessonId = lesson.id;

        return actions.createExercise(course.id, data);
    }, [course, unit, lesson]);

    const handleDeleteExercise = useCallback(exercise => {
        return actions.deleteExercise(course.id, exercise.id);
    }, [course]);

    const handleCreateSection = useCallback(data => {
        data.unitId = unit.id;
        data.lessonId = lesson.id;

        return actions.createSection(course.id, data);
    }, [course, unit, lesson]);

    const handleDeleteSection = useCallback(section => {
        return actions.deleteSection(course.id, section.id);
    }, [course]);

    if (!lesson) return <LoadingIndicator fluid />;

    return (
        <Page className="LessonPage">
            <Page.Header
                title={
                    <EditableText
                        content={lesson.title}
                        required
                        onUpdate={handleUpdateLessonTitle}
                    />
                }
                breadcrumbs={[
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' },
                    { key: 'unit', content: unit.title, to: unit.uri, title: 'Юнит' }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить урок',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={8}>
                        <LessonDescription
                            lesson={lesson}
                            onUpdate={handleUpdateLesson}
                        />
                    </Grid.Item>

                    <Grid.Item xs={4}>
                        <LessonSections
                            lesson={lesson}
                            onCreate={handleCreateSection}
                            onDelete={handleDeleteSection}
                            onReorder={handleUpdateLesson}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить урок?"
                message={`Урок "${lesson.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteLesson}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}