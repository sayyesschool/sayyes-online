import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';

import ExerciseForm from 'app/components/courses/exercise-form';
import ExercisesList from 'app/components/courses/exercises-list';

export default function LessonExercises({
    lesson,
    selectedExercise,

    onCreate,
    onDelete,
    onReorder
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

    const handleReorder = useCallback((index, dir) => {
        const exercises = lesson._exercises.slice();
        const exercise = exercises[index];
        const otherExercise = exercises[index + dir];

        exercises[index + dir] = exercise;
        exercises[index] = otherExercise;

        onReorder({ _exercises: exercises });
    }, [lesson]);

    const handleDeleteRequest = useCallback(exercise => {
        setExercise(exercise);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="LessonExercises"
            title="Упражнения"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Добавить упражнение',
                onClick: toggleFormOpen
            }]}
            compact
        >
            {lesson.exercises?.length > 0 &&
                <ExercisesList
                    exercises={lesson.exercises}
                    selectedExercise={selectedExercise}
                    onSelect={selectedExercise && setExercise}
                    onReorder={handleReorder}
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