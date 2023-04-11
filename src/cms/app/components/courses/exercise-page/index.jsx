import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { useExercise } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import EditableText from 'shared/components/editable-text';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Flex, Grid } from 'shared/ui-components';

import ExerciseDetails from 'app/components/courses/exercise-details';
import ExerciseItems from 'app/components/courses/exercise-items';
import ExerciseNotes from 'app/components/courses/exercise-notes';

export default function ExercisePage({ match, history }) {
    const { course, unit, lesson, exercise, actions } = useExercise(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    useEffect(() => {
        if (exercise && !exercise.items) {
            actions.getExercise(course.id, exercise.id);
        }
    }, [course, exercise]);

    const handleUpdate = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data);
    }, [course, exercise]);

    const handleUpdateExerciseTitle = useCallback(title => {
        return actions.updateExercise(course.id, exercise.id, { title });
    }, [course, exercise]);

    const handleDelete = useCallback(() => {
        return actions.deleteExercise(course.id, exercise.id)
            .then(() => history.push(lesson.url));
    }, [course, lesson, exercise]);

    const handleCreateItem = useCallback(data => {
        return actions.createExerciseItem(course.id, exercise.id, data);
    }, [course, exercise]);

    const handleUpdateItem = useCallback((itemId, data) => {
        return actions.updateExerciseItem(course.id, exercise.id, itemId, data);
    }, [course, exercise]);

    const handleDeleteItem = useCallback((itemId, data) => {
        return actions.deleteExerciseItem(course.id, exercise.id, itemId, data);
    }, [course, exercise]);

    if (!exercise?.items) return <LoadingIndicator fluid />;

    return (
        <Page id="ExercisePage">
            <Page.Header
                title={
                    <EditableText
                        content={exercise.title}
                        required
                        onUpdate={handleUpdateExerciseTitle}
                    />
                }
                breadcrumbs={[
                    { key: 'courses', content: 'Курсы', to: '/courses' },
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' },
                    { key: 'unit', content: unit.title, to: unit.uri, title: 'Юнит' },
                    { key: 'lesson', content: lesson.title, to: lesson.uri, title: 'Урок' }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить упражнение',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={8}>
                        <ExerciseItems
                            exercise={exercise}
                            onCreate={handleCreateItem}
                            onUpdate={handleUpdateItem}
                            onDelete={handleDeleteItem}
                            onReorder={handleUpdate}
                        />
                    </Grid.Item>

                    <Grid.Item xs={4}>
                        <ExerciseNotes
                            exercise={exercise}
                            onUpdate={handleUpdate}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить упражнение?"
                message="Упражнение будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onClose={toggleConfirmationDialogOpen}
                onConfirm={handleDelete}
            />
        </Page>
    );
}