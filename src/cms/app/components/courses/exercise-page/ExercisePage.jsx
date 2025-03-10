import { useCallback, useEffect } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useExercise } from 'shared/hooks/courses';
import { useBoolean } from 'shared/hooks/state';
import { Flex, Grid } from 'shared/ui-components';

import ExerciseDescription from 'cms/components/courses/exercise-description';
import ExerciseItems from 'cms/components/courses/exercise-items';
import ExerciseNotes from 'cms/components/courses/exercise-notes';

export default function ExercisePage({ match, history }) {
    const { course, exercise, actions } = useExercise(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const section = exercise?.section;
    const lesson = section?.lesson;
    const unit = lesson?.unit;

    useEffect(() => {
        if (exercise && !exercise.items) {
            actions.getExercise(exercise.courseId, exercise.id);
        }
    }, [exercise, actions]);

    const handleUpdate = useCallback(data => {
        return actions.updateExercise(course.id, exercise.id, data);
    }, [course, exercise, actions]);

    const handleDelete = useCallback(() => {
        return actions.deleteExercise(course.id, exercise.id)
            .then(() => history.push(lesson.url));
    }, [course, lesson, exercise, actions, history]);

    const handleCreateItem = useCallback(data => {
        return actions.createExerciseItem(course.id, exercise.id, data);
    }, [course, exercise, actions]);

    const handleUpdateItem = useCallback((itemId, data) => {
        return actions.updateExerciseItem(course.id, exercise.id, itemId, data);
    }, [course, exercise, actions]);

    const handleDeleteItem = useCallback((itemId, data) => {
        return actions.deleteExerciseItem(course.id, exercise.id, itemId, data);
    }, [course, exercise, actions]);

    if (!exercise?.items) return <LoadingIndicator fluid />;

    return (
        <Page className="ExercisePage">
            <Page.Header
                title="Упражнение"
                description={`ID: ${exercise.id}`}
                breadcrumbs={[
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' },
                    { key: 'unit', content: unit.title, to: unit.uri, title: 'Юнит' },
                    { key: 'lesson', content: lesson.title, to: lesson.uri, title: 'Урок' },
                    { key: 'section', content: section.title, to: section.uri, title: 'Секция' }
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
                        <Flex gap="medium" column>
                            <ExerciseDescription
                                exercise={exercise}
                                onUpdate={handleUpdate}
                            />

                            <ExerciseItems
                                exercise={exercise}
                                onCreate={handleCreateItem}
                                onUpdate={handleUpdateItem}
                                onDelete={handleDeleteItem}
                                onReorder={handleUpdate}
                            />
                        </Flex>
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