import { useCallback, useState } from 'react';
import { Button } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import Icon from 'shared/components/material-icon';
import PageSection from 'shared/components/page-section';

import ExerciseForm from 'app/components/courses/exercise-form';
import ExercisesList from 'app/components/courses/exercises-list';

import './index.scss';

export default function LessonExercises({
    course,
    lesson,
    selectedExercise,

    onCreate,
    onDelete
}) {
    const [exercise, setExercise] = useState(selectedExercise);
    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        return onCreate(data)
            .finally(() => toggleFormOpen(false));
    }, []);

    const handleDelete = useCallback(() => {
        return onDelete(exercise)
            .finally(() => toggleConfirmationDialogOpen(false));
    }, [exercise]);

    const handleDeleteRequest = useCallback(exercise => {
        setExercise(exercise);
        toggleConfirmationDialogOpen(true);
    }, []);

    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <PageSection
            className="lesson-exercises"
            title="Упражнения"
            actions={
                <Button
                    icon={<Icon>add</Icon>}
                    iconOnly
                    text
                    onClick={toggleFormOpen}
                />
            }
        >
            {exercises?.length > 0 &&
                <ExercisesList
                    exercises={exercises}
                    selectedExercise={selectedExercise}
                    onSelect={selectedExercise && setExercise}
                    onDelete={handleDeleteRequest}
                />
            }

            <FormDialog
                title="Новое упражнение"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <ExerciseForm
                    id="exercise-form"
                    onSubmit={handleCreate}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить упражнение?"
                message={exercise && `Упражнение "${exercise.title}" будет удалено без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}