import { useCallback, useEffect } from 'react';
import { Flex, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { useExercise } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import ExerciseDetails from 'app/components/courses/exercise-details';
import ExerciseItems from 'app/components/courses/exercise-items';
import ExerciseNotes from 'app/components/courses/exercise-notes';

import './index.scss';

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

    if (!exercise?.items) return <LoadingIndicator />;

    return (
        <Page id="exercise-page">
            <Page.Header
                title={exercise.title}
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' },
                    { key: 'course', text: course.title, url: course.uri, title: 'Курс' },
                    { key: 'unit', text: unit.title, url: unit.uri, title: 'Юнит' },
                    { key: 'lesson', text: lesson.title, url: lesson.uri, title: 'Урок' }
                ]}
                toolbar={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить упражнение',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Flex gap="gap.medium" column>
                        <ExerciseItems
                            exercise={exercise}
                            onCreate={handleCreateItem}
                            onUpdate={handleUpdateItem}
                            onDelete={handleDeleteItem}
                            onReorder={handleUpdate}
                        />
                    </Flex>

                    <Flex gap="gap.medium" column>
                        <ExerciseDetails
                            exercise={exercise}
                            onUpdate={handleUpdate}
                        />

                        <ExerciseNotes
                            exercise={exercise}
                            onUpdate={handleUpdate}
                        />
                    </Flex>
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