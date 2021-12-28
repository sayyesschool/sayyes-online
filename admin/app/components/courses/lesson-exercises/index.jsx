import { useCallback, useState } from 'react';
import {
    Card,
    IconButton,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import ExercisesList from 'shared/components/exercises-list';

import ExerciseCard from 'app/components/courses/exercise-card';
import ExerciseForm from 'app/components/courses/exercise-form';

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
    const exercise = exercises.find(exercise => exercise.id === selectedExerciseId);

    return (
        <section className="lesson-exercises">
            <LayoutGrid>
                <LayoutGrid.Cell span="8">
                    {exercise ?
                        <ExerciseCard
                            course={course}
                            exercise={exercise}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                        :
                        <Typography type="headline6">Упражнение не выбрано</Typography>
                    }
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="4">
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
                </LayoutGrid.Cell>
            </LayoutGrid>

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