import { useCallback, useState } from 'react';
import {
    Card,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';

import ExerciseForm from 'app/components/courses/exercise-form';
import ExercisesList from 'app/components/courses/exercises-list';

import './index.scss';

export default function LessonExercises({
    course,
    lesson,

    onCreate,
    onUpdate,
    onDelete
}) {
    const [selectedExerciseId, setSelectedExerciseId] = useState(lesson.exercises[0]);
    const [isFormOpen, toggleFormOpen] = useBoolean(false);
    const [isLoading, toggleLoading] = useBoolean(false);

    const handleCreate = useCallback(data => {
        toggleLoading(true);

        return onCreate(data)
            .then(response => {
                setSelectedExerciseId(response.data.id);
            })
            .finally(() => {
                toggleLoading(false);
                toggleFormOpen(false);
            });
    }, [lesson.exercises]);

    const handleSelect = useCallback((exercise) => {
        setSelectedExerciseId(exercise.id);
    }, []);

    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));

    return (
        <section className="lesson-exercises">
            <Card>
                <Card.Header
                    title="Упражнения"
                    actions={[
                        <IconButton
                            key="create"
                            icon="add"
                            onClick={toggleFormOpen}
                        />
                    ]}
                />

                {exercises?.length > 0 &&
                    <ExercisesList
                        exercises={exercises}
                        selectedExerciseId={selectedExerciseId}
                        onSelect={handleSelect}
                    />
                }
            </Card>

            <FormDialog
                title="Новое упражнение"
                form="exercise-form"
                open={isFormOpen}
                primaryActionDisabled={isLoading}
                fullscreen
                onClose={toggleFormOpen}
            >
                <ExerciseForm
                    id="exercise-form"
                    course={course}
                    onSubmit={handleCreate}
                />
            </FormDialog>
        </section>
    );
}