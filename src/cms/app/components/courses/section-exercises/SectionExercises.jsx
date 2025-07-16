import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import PageSection from 'shared/components/page-section';
import { useBoolean } from 'shared/hooks/state';

import ExerciseForm from 'cms/components/courses/exercise-form';
import ExercisesList from 'cms/components/courses/exercises-list';

export default function SectionExercises({
    section,

    onCreate,
    onDelete,
    onReorder
}) {
    const [exercise, setExercise] = useState();

    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleCreate = useCallback(() => {
        const data = {
            courseId: section.courseId,
            sectionId: section.id
        };

        return onCreate(data)
            .finally(() => {
                toggleFormOpen(false);
            });
    }, []);

    const handleDelete = useCallback(() => {
        return onDelete(exercise)
            .finally(() => toggleConfirmationDialogOpen(false));
    }, [exercise]);

    const handleReorder = useCallback((atIndex, toIndex) => {
        const exercises = section._exercises.slice();
        const exercise = exercises[atIndex];
        const otherExercise = exercises[toIndex];

        exercises[toIndex] = exercise;
        exercises[atIndex] = otherExercise;

        onReorder({ _exercises: exercises });
    }, [section, onReorder]);

    const handleDeleteRequest = useCallback(exercise => {
        setExercise(exercise);
        toggleConfirmationDialogOpen(true);
    }, []);

    return (
        <PageSection
            className="SectionExercises"
            title="Упражнения"
            actions={[{
                key: 'add',
                icon: 'add',
                title: 'Добавить упражнение',
                onClick: handleCreate
            }]}
            compact
            plain
        >
            {section.exercises?.length > 0 &&
                <ExercisesList
                    exercises={section.exercises}
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
                message={exercise && `Упражнение "${exercise.id}" будет удалено без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDelete}
                onClose={toggleConfirmationDialogOpen}
            />
        </PageSection>
    );
}