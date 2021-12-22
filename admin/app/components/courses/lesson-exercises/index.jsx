import { useCallback, useState } from 'react';
import {
    Card,
    IconButton,
    LayoutGrid
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
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [isFormOpen, setFormOpen] = useBoolean(false);

    const handleCreate = useCallback(data => {
        return onCreate(data).then(() => setFormOpen(false));
    }, []);

    const handleSelect = useCallback((exercise, index) => {
        setExerciseIndex(index);
    }, []);

    const exercises = lesson.exercises.map(id => course.exercisesById.get(id));
    const exercise = exercises[exerciseIndex];

    return (
        <section className="lesson-exercises">
            <LayoutGrid>
                <LayoutGrid.Cell span="8">
                    <ExerciseCard
                        key={exercise.id}
                        course={course}
                        exercise={exercise}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="4">
                    <Card>
                        <Card.Header
                            title="Упражнения"
                            actions={[
                                <IconButton
                                    key="create"
                                    icon="add"
                                    onClick={setFormOpen}
                                />
                            ]}
                        />

                        <ExercisesList
                            exercises={exercises}
                            selectedExerciseIndex={exerciseIndex}
                            onSelect={handleSelect}
                        />
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>

            <FormDialog
                title="Новое упражнение"
                form="exercise-form"
                fullscreen
                open={isFormOpen}
                onClose={setFormOpen}
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