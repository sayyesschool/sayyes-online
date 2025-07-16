import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';

import ExerciseForm from 'cms/components/courses/exercise-form';
import ExercisesList from 'cms/components/courses/exercises-list';

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
    }, [onCreate]);

    const handleDelete = useCallback(() => {
        return onDelete(exercise)
            .finally(() => toggleConfirmationDialogOpen(false));
    }, [exercise, onDelete]);

    const handleReorder = useCallback((atIndex, toIndex) => {
        console.log({ atIndex, toIndex });
        const exercises = lesson._exercises.slice();
        const exercise = exercises[atIndex];
        const otherExercise = exercises[toIndex];

        exercises[toIndex] = exercise;
        exercises[atIndex] = otherExercise;
    }, [lesson, onReorder]);

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